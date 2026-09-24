# 🏏 IPL 2026 Cricket Data Scraper & Analysis

An end-to-end data project focused on collecting, cleaning, organizing, analyzing, and visualizing **IPL 2026 cricket data**.

The project uses **JavaScript and Playwright** to scrape match and scorecard data, **Google Sheets** for data cleaning and organization, and **Python** libraries for data analysis and visualization. The processed data is also used to create interactive dashboards in **Power BI**.

---

## 📌 Project Overview

This project collects IPL 2026 match-level and player-level cricket data from ESPN Cricket and transforms the raw web data into structured datasets suitable for analysis.

The main objective is to build a complete data pipeline:

```text
ESPN Cricket
     ↓
JavaScript + Playwright
     ↓
Raw Cricket Data
     ↓
CSV Files
     ↓
Google Sheets
(Data Cleaning & Organization)
     ↓
Python
(Pandas + NumPy)
     ↓
Data Analysis
     ↓
Matplotlib + Seaborn
(Data Visualization)
     ↓
Power BI
(Interactive Dashboard)
```

---

## 🎯 Objectives

* Scrape IPL 2026 match data from ESPN Cricket.
* Collect match information and scorecard details.
* Extract batsman statistics.
* Extract bowler statistics.
* Store scraped data in CSV format.
* Clean and organize the raw data using Google Sheets.
* Perform data analysis using Python.
* Create visualizations using Matplotlib and Seaborn.
* Build an interactive Power BI dashboard.
* Explore player and team performance using data.

---

## 🛠️ Technologies Used

### Web Scraping

* **JavaScript**
* **Node.js**
* **Playwright**

Playwright is used to navigate ESPN Cricket pages, access dynamically rendered content, and extract match and scorecard information.

### Data Cleaning & Organization

* **Google Sheets**

Google Sheets was used to clean, format, validate, and organize the scraped data before performing further analysis.

### Data Analysis

* **Python**
* **Pandas**
* **NumPy**

These tools were used for data manipulation, transformation, aggregation, and statistical analysis.

### Data Visualization

* **Matplotlib**
* **Seaborn**

Used to create charts and explore patterns in player and team performance.

### Dashboard

* **Microsoft Power BI**

Used to create interactive dashboards and present key insights from the processed IPL data.

---

## 📊 Data Collected

The project currently focuses on match and scorecard information, including:

### Match Data

* Match number
* Teams
* Venue
* Match date
* Match result
* Team scores
* Overs
* Scorecard URL

### Batting Data

* Match number
* Team
* Batsman
* Dismissal
* Runs
* Balls faced
* Minutes
* Fours
* Sixes
* Strike rate

### Bowling Data

* Match number
* Team
* Bowler
* Overs
* Maidens
* Runs conceded
* Wickets
* Economy rate
* Dot balls
* Fours conceded
* Sixes conceded
* Wides
* No-balls

---

## 🧹 Data Cleaning

The scraped data is initially stored as raw CSV data.

Google Sheets is used as an intermediate data-cleaning and organization layer.

Some of the cleaning tasks include:

* Removing unwanted or duplicate records
* Checking missing values
* Standardizing team names
* Organizing batting and bowling columns
* Converting numerical values into appropriate formats
* Separating combined values where required
* Checking score and overs formats
* Organizing datasets for analysis
* Preparing clean datasets for Python and Power BI

For example, a score such as:

```text
30/9
```

can be separated into:

```text
Runs: 30
Wickets: 9
```

while a value such as:

```text
30
```

can be interpreted according to the required dataset structure.

---

## 🐍 Python Analysis

After cleaning and organizing the data, Python is used for further analysis.

### Pandas

Used for:

* Reading CSV files
* Data cleaning
* Filtering
* Grouping
* Aggregation
* Creating calculated columns
* Player-level analysis
* Team-level analysis

### NumPy

Used for:

* Numerical calculations
* Statistical operations
* Data transformations

---

## 📈 Data Visualization

Matplotlib and Seaborn are used to explore the data visually.

Possible analysis includes:

* Top run scorers
* Top wicket takers
* Batting strike rates
* Bowling economy rates
* Team scoring patterns
* Boundary analysis
* Player performance comparisons
* Match-level performance

Example visualizations:

```text
Top Run Scorers
Top Wicket Takers
Highest Strike Rates
Best Bowling Economy
Team Run Distribution
Runs vs Balls Faced
Wickets vs Economy
```

---

## 📊 Power BI Dashboard

The cleaned and analyzed data is also used in Power BI to create an interactive cricket analytics dashboard.

The dashboard can be used to explore:

* Team performance
* Player performance
* Batting statistics
* Bowling statistics
* Match results
* Runs and wickets
* Strike rates
* Economy rates

---

## 📁 Project Structure

```text
IPL-2026-cricket-scraper/
│
├── DataScraping/
│   ├── scoreInfoScraping.js
│   └── matchInfoScraping.js
│
├── data/
│   ├── raw/
│   │   └── ipl_matches.csv
    |   └── ipl_matches_BatsmanScore.csv
    |   ....
│   └── cleaned/
│       └── ...
│
├── python/
│   ├── analysis.py
│   └── ...
│
├── visualizations/
│   └── ...
│
├── powerbi/
│   └── ...
│
├── package.json
├── README.md
└── .gitignore
```

> The exact folder structure may change as the project develops.

---

## 🚀 How to Run the Web Scraper

Note:
node -v = v22.19.0
npm -v = 10.9.3

### 1. Clone the repository

```bash
git clone https://github.com/Dileep-getdata/ipl-2026-cricket-scraper.git
```

### 2. Navigate to the project

```bash
cd IPL-2026-cricket-scraper
```

### 3. Install Node.js dependencies

```bash
npm install
```

### 4. Install Playwright browser

```bash
npx playwright install chromium
```

### 5. Run the scraper

```bash
node scraper/scoreInfoScraping.js
```

The scraper collects the required data and saves it as CSV files.

---

## 🔄 Data Pipeline

The complete workflow of this project is:

### 1. Web Scraping

JavaScript + Playwright is used to navigate ESPN Cricket and extract dynamically loaded match and scorecard data.

### 2. Raw Data Export

The extracted data is stored in CSV format.

### 3. Data Cleaning

Google Sheets is used to clean, organize, and validate the raw data.

### 4. Python Processing

Pandas and NumPy are used to transform and analyze the cleaned datasets.

### 5. Visualization

Matplotlib and Seaborn are used to create statistical visualizations.

### 6. Dashboard

Power BI is used to build an interactive dashboard for exploring the results.

---

## 💡 Key Learning Outcomes

Through this project, I worked with an end-to-end data workflow involving:

* Web scraping with Playwright
* Handling dynamically rendered web pages
* DOM element selection
* Extracting structured cricket statistics
* Working with CSV data
* Data cleaning and organization using Google Sheets
* Python data analysis
* Pandas and NumPy
* Data visualization
* Power BI dashboard development
* Building a practical data pipeline

---

## 🔮 Future Improvements

Potential future improvements include:

* Automating the complete data-cleaning process
* Scraping additional IPL seasons
* Adding player profiles and career statistics
* Adding team-level historical analysis
* Automating the Power BI data refresh
* Adding more advanced cricket performance metrics
* Creating predictive analysis using machine learning
* Building an automated end-to-end ETL pipeline

---

## ⚠️ Disclaimer

This project is created for **educational and data-analysis purposes**. The scraped data is used to demonstrate web scraping, data engineering, analytics, and visualization techniques.

Data belongs to its respective source and rights holders.

---

## 👨‍💻 Project

**IPL 2026 Cricket Scraper & Analysis**

Technologies:

```text
JavaScript
Node.js
Playwright
Google Sheets
Python
Pandas
NumPy
Matplotlib
Seaborn
Power BI
```
