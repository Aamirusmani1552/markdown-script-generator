import csv from "csv-parser";
import fs from "fs";
import readline from "readline";

type NewDataRow = {
  name: string;
  alias_of: string;
  tlb: string;
  doc_category: string;
  doc_opcode: string;
  doc_fift: string;
  doc_stack: string;
  doc_gas: string;
  doc_description: string;
};

async function updateTheFile(path: string, newData: NewDataRow) {
  const results: NewDataRow[] = [];

  try {
    fs.createReadStream(path)
      .pipe(csv())
      .on("data", (data) => results.push(data))
      .on("end", () => {
        // checking if we have results
        if (results.length > 0) {
          const createCsvWriter = require("csv-writer").createObjectCsvWriter;

          // creating new data object

          // adding new data to the result
          results.push(newData);

          // writing updated data to the file
          const csvWriter = createCsvWriter({
            path: path,
            header: [
              { id: "name", title: "Name" },
              { id: "alias_of", title: "Alias Of" },
              { id: "tlb", title: "TLB" },
              { id: "doc_category", title: "Category" },
              { id: "doc_opcode", title: "Opcode" },
              { id: "doc_fift", title: "Fift" },
              { id: "doc_stack", title: "Stack" },
              { id: "doc_gas", title: "Gas" },
              { id: "doc_description", title: "Description" },
            ],
          });
          csvWriter
            .writeRecords(results)
            .then(() => console.log("The CSV file was updated successfully"));
        }
      });
  } catch (error) {
    const err = error as Error;
    console.log(err.message);
  }
}

async function main() {
  let filepath = "";

  const newData: NewDataRow = {
    name: "",
    alias_of: "",
    tlb: "",
    doc_category: "",
    doc_opcode: "",
    doc_fift: "",
    doc_stack: "",
    doc_gas: "",
    doc_description: "",
  };

  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  filepath = await new Promise((resolve) => {
    rl.question("Enter the path to file: ", (filepath) => {
      resolve(filepath);
    });
  });

  console.log("\x1b[32m", "\nEnter the data for the following fields");
  console.log("\x1b[0m");
  newData.name = await new Promise((resolve) => {
    rl.question("Enter Name of Opcode: ", (name) => {
      resolve(name);
    });
  });

  newData.alias_of = await new Promise((resolve) => {
    rl.question("Enter alias_of: ", (alias_of) => {
      resolve(alias_of);
    });
  });

  newData.tlb = await new Promise((resolve) => {
    rl.question("Enter tlb: ", (tlb) => {
      resolve(tlb);
    });
  });

  newData.doc_category = await new Promise((resolve) => {
    rl.question("Enter doc_category: ", (doc_category) => {
      resolve(doc_category);
    });
  });

  newData.doc_opcode = await new Promise((resolve) => {
    rl.question("Enter doc_opcode: ", (doc_opcode) => {
      resolve(doc_opcode);
    });
  });

  newData.doc_fift = await new Promise((resolve) => {
    rl.question("Enter doc_fift: ", (doc_fift) => {
      resolve(doc_fift);
    });
  });

  newData.doc_stack = await new Promise((resolve) => {
    rl.question("Enter doc_stack: ", (doc_stack) => {
      resolve(doc_stack);
    });
  });

  newData.doc_gas = await new Promise((resolve) => {
    rl.question("Enter doc_gas: ", (doc_gas) => {
      resolve(doc_gas);
    });
  });

  newData.doc_description = await new Promise((resolve) => {
    rl.question("Enter doc_description: ", (doc_description) => {
      resolve(doc_description);
    });
  });

  rl.close();

  await updateTheFile("./opcodes.csv", newData);
}

main();
