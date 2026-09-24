const { chromium } = require("playwright");
const fs = require("fs");

async function scrape() {
    const browser = await chromium.launch({
        headless: false
    });

    const page = await browser.newPage();
    console.log("Opening page...");

    await page.goto("https://www.espn.in/cricket/scores/series/8048/season/2026/indian-premier-league", {
        waitUntil: "domcontentloaded",
        timeout: 60000
    });
    console.log("Page loaded");

    await page.waitForTimeout(5000);
    // const scoreBoard = page.locator("#score_bord");
    // console.log(
    //     "Scoreboard count:",
    //     await scoreBoard.count()
    // );
    const matches = await page.locator("#scoreboard-page .cscore")
        .evaluateAll(elements => {
            return elements.map(match => {
                const overview = match.querySelector('.cscore_info-overview')?.innerText.trim() || "";

                const matchNoMatch = overview.match(/^(\d+)(st|nd|rd|th)\s+Match/i)
                const matchNo = matchNoMatch
                    ? matchNoMatch[1]
                    : "";
                const stadiumMatch =
                    overview.match(/\bat\s+([^,]+)/i);

                const stadium = stadiumMatch
                    ? stadiumMatch[1].trim()
                    : "";

                const teamElements =
                    match.querySelectorAll(
                        ".cscore_competitors .cscore_item"
                    );

                const teams = Array.from(teamElements).map(team => {

                    const name =
                        team.querySelector(
                            ".cscore_name--long"
                        )?.innerText.trim() || "";

                    const scoreElement =
                        team.querySelector(
                            ".cscore_score"
                        );
                    let score = "";
                    let overs = "";
                    if (scoreElement) {
                        // Get only the direct text of .cscore_score
                        // Example: "203/4"
                        score = Array.from(scoreElement.childNodes)
                            .filter(node => node.nodeType === Node.TEXT_NODE)
                            .map(node => node.textContent)
                            .join("")
                            .trim();

                        // Get text from .cscore_overs
                        // Example: "(15.4/20 ov, target 202)"
                        const oversElement =
                            scoreElement.querySelector(".cscore_overs");

                        if (oversElement) {
                            overs = oversElement.innerText
                                .trim()
                                .replace(/[()]/g, "");
                        }
                    }
                    return {
                        name,
                        score,
                        overs
                    };
                });

                return {
                    matchNo,
                    stadium,

                    team1: teams[0]?.name || "",
                    team1Score: teams[0]?.score || "",
                    team1Overs: teams[0]?.overs || "",


                    team2: teams[1]?.name || "",
                    team2Score: teams[1]?.score || "",
                    team2Overs: teams[1]?.overs || ""

                };

            })
        });
    console.log("Matches found:", matches.length);

    console.table(matches);

    const headers = [
        "Match No",
        "Stadium",
        "Team 1",
        "Team 1 Score",
        "Team 1 Overs",

        "Team 2",
        "Team 2 Score",
        "Team 2 Overs",

    ];

    const csvRows = [
        headers,
        ...matches.map(match => [
            match.matchNo,
            match.stadium,
            match.team1,
            match.team1Score,
            match.team1Overs,
            match.team2,
            match.team2Score,
            match.team2Overs,

        ])
    ];

    const csv = csvRows
        .map(row =>
            row.map(value => {
                const text = String(value ?? "");
                return `"${text.replace(/"/g, '""')}"`;
            }).join(",")
        )
        .join("\n");


    // Save CSV
    fs.writeFileSync(
        "../Data/RawData/ipl_matches.csv",
        csv,
        "utf8"
    );

    console.log("CSV created: ipl_matches.csv");
    await browser.close();
}

scrape();