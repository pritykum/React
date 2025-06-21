import React, { useEffect, useRef } from "react";
import $ from "jquery";
import jszip from "jszip";

// DataTables dependencies
import "datatables.net-dt/css/jquery.dataTables.css";
import "datatables.net-buttons-dt/css/buttons.dataTables.css";
import "datatables.net-responsive-dt/css/responsive.dataTables.css";

import "datatables.net-dt";
import "datatables.net-responsive-dt";
import "datatables.net-buttons";
import "datatables.net-buttons/js/buttons.html5";

// Make JSZip available globally for Excel export
window.JSZip = jszip;

interface NeighborDataTableProps {
  rows: { [key: string]: any }[];
}

const NeighborDataTable: React.FC<NeighborDataTableProps> = ({ rows }) => {
  const tableRef = useRef<HTMLTableElement>(null);

  useEffect(() => {
    if (!rows.length) return;

    const table = $(tableRef.current!).DataTable({
      data: rows.map(Object.values),
      columns: Object.keys(rows[0]).map((key) => ({ title: humanize(key) })),
      scrollX: true,
      scrollCollapse: true,
      pageLength: 25,
      lengthMenu: [25, 50, 100, 250, 500],
      dom: "Bfrtip",
      buttons: [
        {
          extend: "excelHtml5",
          title: "Export 4G‑4G",
          filename: "4g_4g_neighbors",
        },
        {
          extend: "csvHtml5",
          title: "Export 4G‑4G",
          filename: "4g_4g_neighbors",
        },
      ],
      destroy: true, // allow reinitialization
      initComplete: function () {
        this.api()
          .columns()
          .every(function () {
            const column = this;
            const input = $('<input type="text" placeholder="Search" style="width:100%;" />')
              .appendTo($(column.footer()).empty())
              .on("keyup change clear", function () {
                if (column.search() !== this.value) {
                  column.search(this.value).draw();
                }
              });
          });
      },
    });

    return () => table.destroy();
  }, [rows]);

  const humanize = (str: string) =>
    str
      .replace(/_/g, " ")
      .replace(/([a-z])([A-Z])/g, "$1 $2")
      .replace(/\b\w/g, (c) => c.toUpperCase());

  return (
    <table
      ref={tableRef}
      className="display nowrap stripe hover"
      style={{ width: "100%", fontSize: "0.85rem" }}
    >
      <thead>
        <tr>
          {Object.keys(rows[0] || {}).map((k) => (
            <th key={k}>{humanize(k)}</th>
          ))}
        </tr>
      </thead>
      <tfoot>
        <tr>
          {Object.keys(rows[0] || {}).map((k) => (
            <th key={k}>{humanize(k)}</th>
          ))}
        </tr>
      </tfoot>
      <tbody />
    </table>
  );
};

export default NeighborDataTable;
