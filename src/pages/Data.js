import React, { useState, useEffect } from "react";
import { DataType, Table, useTable } from "ka-table";
import { EditingMode, SortingMode } from "ka-table/enums";
import { kaPropsUtils } from "ka-table/utils";
import { openAllEditors } from "ka-table/actionCreators";
import { Button, message } from "antd";

const columnHeaders = [
  "Full Name",
  "Grad Year",
  "Cash",
  "Current Bonds",
  "Current Stocks", d
  "Bonds +1",
  "Stocks +1",
  "Bonds +2",
  "Stocks +2",
  "Bonds +3",
  "Stocks +3",
  "Loans",
  "Net Worth",
  "Wage Income",
  "Capital Gains on Current Stocks",
  "Interest Earned on Current Bonds",
  "Withdrawals from Tax Deferred Accounts",
  "Deposits to Tax Deferred Accounts",
  "Taxable Income",
  "Taxes",
  "Net Income",
  "Beginning Cash",
  "Add Net Income",
  "New Loans",
  "Grants Received",
  "Loan Payments",
  "Spending",
  "Fees and Penalties",
  "Ending Cash Balance",
];
export default function Data({ updateCells, columns }) {
  return (
    <div>
      <div style={{ height: "90vh", overflow: "scroll" }}>
        {columns.length > 0 && (
          <Table
            table={table}
            columns={columns}
            data={dataArray}
            editingMode={EditingMode.Cell}
            rowKeyField={"id"}
            sortingMode={SortingMode.Single}
            singleAction={openAllEditors()}
          />
        )}
      </div>
      <div
        style={{
          width: "100%",
          height: "10vh",
          justifyContent: "center",
          alignItems: "center",
          display: "flex",
        }}
      >
        <div
          style={{
            marginLeft: "auto",
            marginRight: "auto",
            width: "fit-content",
          }}
        >
          <Button
            onClick={updateCells}
            style={{ marginLeft: "auto", marginRight: "auto" }}
            size="lg"
          >
            Update
          </Button>
        </div>
      </div>
    </div>
  );
}
