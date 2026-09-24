const { chromium } = require("playwright");
const fs = require("fs");

async function scrape() {
    const browser = await chromium.launch({
        headless: false
    });

    const page = await browser.newPage();
    console.log("Opening page...");
    const allBatsmen = [];
    const allBowlers = [];


    await page.goto("https://www.espn.in/cricket/scores/series/8048/season/2026/indian-premier-league", {
        waitUntil: "domcontentloaded",
        timeout: 60000
    });
    console.log("Page loaded");

    await page.waitForTimeout(5000);

    const matchCount = await page.locator("#scoreboard-page .cscore").count()
    console.log('matchCount:', matchCount)
    const scorecardLinks = await page
        .locator("#scoreboard-page .cscore a")
        .filter({ hasText: /scorecard/i })
        .evaluateAll(links =>
            links.map(link => ({
                text: link.innerText.trim(),
                href: link.href
            }))
        );

    console.log("Scorecard links:", scorecardLinks.length);

    scorecardLinks.slice(0, 4).forEach((link, i) => {
        console.log(i + 1, link.text, link.href);
    });
    for (let i = 0; i < scorecardLinks.length; i++) {

        const match = scorecardLinks[i];
        // const link = match.locator("a").first();

        console.log(`\nMatch ${i + 1}`);
        console.log("URL:", match.href);

        await page.goto(match.href, {
            waitUntil: "domcontentloaded",
            timeout: 60000
        });
        console.log("Opened:", page.url());

        await page.waitForLoadState("domcontentloaded");
        console.log("Opened:", page.url());

        // // Scrape match details here
        try {
            await page.waitForSelector(
                "#main-container .main-content .layout-bc .col-b article.sub-module.scorecard",
                { timeout: 30000 }
            );
        } catch (error) {
            console.log("Scorecard did not load:", page.url());

            continue;
        }

        const scorecards = page.locator(
            "#main-container .main-content .layout-bc .col-b article.sub-module.scorecard"
        );
        const scorecardCount = await scorecards.count()
        console.log("Scorecard count:", scorecardCount);

        for (let inningsIndex = 0; inningsIndex < scorecardCount; inningsIndex++) {
            const scorecard = scorecards.nth(inningsIndex);

            const innings = await scorecard.locator("h2").allInnerTexts();

            const teams = innings.map(text =>
                text.replace(/\s+Innings.*$/i, "").trim()
            );

            console.log("Team:", teams);
            // ============ Batsman Data Scraping logic ===============

            // const batsmen = await scorecard
            //     .locator(".scorecard-section.batsmen .wrap.batsmen")
            //     .evaluateAll((rows, data) => {
            //         return rows.map(row => {
            //             const cells = row.querySelectorAll(".cell");

            //             return {
            //                 matchNo: data.matchNo,
            //                 team: data.team,
            //                 batsman: cells[0]?.innerText.trim() || "",
            //                 dismissal: cells[1]?.innerText.trim() || "",
            //                 runs: cells[2]?.innerText.trim() || "",
            //                 balls: cells[3]?.innerText.trim() || "",
            //                 minutes: cells[4]?.innerText.trim() || "",
            //                 fours: cells[5]?.innerText.trim() || "",
            //                 sixes: cells[6]?.innerText.trim() || "",
            //                 strikeRate: cells[7]?.innerText.trim() || ""
            //             };
            //         });
            //     }, {
            //         matchNo: i + 1,
            //         team: teams[0]
            //     });
            // allBatsmen.push(...batsmen);


            // ============ Bowler Data Scraping logic ===============
            const bowlers = await scorecard
                .locator(".scorecard-section.bowling table tbody tr")
                .evaluateAll((rows, data) => {
                    return rows.map(row => {
                        const cells = row.querySelectorAll("td");
                        return {
                            matchNo: data.matchNo,
                            team: data.team,
                            Bowling: cells[0]?.innerText.trim() || "",
                            Overs: cells[2]?.innerText.trim() || "",
                            Maidens: cells[3]?.innerText.trim() || "",
                            Runs: cells[4]?.innerText.trim() || "",
                            Wickets: cells[5]?.innerText.trim() || "",
                            Econ: cells[6]?.innerText.trim() || "",
                            Dots: cells[7]?.innerText.trim() || "",
                            fours: cells[8]?.innerText.trim() || "",
                            Sixes: cells[9]?.innerText.trim() || "",
                            Wides: cells[10]?.innerText.trim() || "",
                            NoBalls: cells[11]?.innerText.trim() || ""

                        };
                    });
                }, {
                    matchNo: i + 1,
                    team: teams[0]
                });
            allBowlers.push(...bowlers);
        }
    }

    // ============Bowler CSV==============
    const headers = [
        "MatchNo",
        "Team",
        "Bowling",
        "Overs",
        "Maidens",
        "Runs",
        "Wickets",
        "Econ",
        "Dots",
        "fours",
        "Sixes",
        "Wides",
        "NoBalls"
    ];

    const csvRows = [
        headers,
        ...allBowlers.map(bowler => [
            bowler.matchNo,
            bowler.team,
            bowler.Bowling,
            bowler.Overs,
            bowler.Maidens,
            bowler.Runs,
            bowler.Wickets,
            bowler.Econ,
            bowler.Dots,
            bowler.fours,
            bowler.Sixes,
            bowler.Wides,
            bowler.NoBalls
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
        "../Data/RawData/ipl_matches_BowlerScore.csv",
        csv,
        "utf8"
    );

    // ============BatsMen CSV============
    // const batManHeaders = [
    //     "matchNo",
    //     "team",
    //     "batsman",
    //     "dismissal",
    //     "runs",
    //     "balls",
    //     "minutes",
    //     "fours",
    //     "sixes",
    //     "strikeRate"

    // ];

    // const batsManCsvRows = [
    //     batManHeaders,
    //     ...allBatsmen.map(batsMan => [
    //         batsMan.matchNo,
    //         batsMan.team,
    //         batsMan.batsman,
    //         batsMan.dismissal,
    //         batsMan.runs,
    //         batsMan.balls,
    //         batsMan.minutes,
    //         batsMan.fours,
    //         batsMan.sixes,
    //         batsMan.strikeRate

    //     ])
    // ];

    // const batsMan_CSV = batsManCsvRows
    //     .map(row =>
    //         row.map(value => {
    //             const text = String(value ?? "");
    //             return `"${text.replace(/"/g, '""')}"`;
    //         }).join(",")
    //     )
    //     .join("\n");


    // // Save CSV
    // fs.writeFileSync(
    //     "../Data/RawData/ipl_matches_BatsmanScore.csv",
    //     batsMan_CSV,
    //     "utf8"
    // );

    console.log("CSV created: ipl_matches.csv");
    await browser.close();
}

scrape();