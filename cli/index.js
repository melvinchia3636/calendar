const prompts = require("prompts");
const moment = require("moment");
const Table = require("cli-table");

(async () => {
  const response = await prompts({
    type: "number",
    name: "year",
    message: "Please enter the year",
  });

  const date = moment()
    .year(response.year)
    .month(0)
    .date(1)
    .hour(0)
    .minute(0)
    .second(0)
    .millisecond(0);

  for (let i = 0; i < 12; i++) {
    const table = new Table({
      head: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
    });

    const month = date.month(i).format("MMMM");
    const startDay = date.month(i).day();
    const daysInMonth = date.month(i).daysInMonth();

    let row = [];
    for (let j = 0; j < startDay; j++) {
      row.push("");
    }

    for (let j = 1; j <= daysInMonth; j++) {
      row.push(j);
      if ((j + startDay) % 7 === 0) {
        table.push(row);
        row = [];
      }
    }

    if (row.length > 0) {
      table.push(row);
    }

    console.log(month);
    console.log(table.toString());
  }
})();
