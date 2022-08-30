import * as React from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Container } from "react-bootstrap";
import Button from "@mui/material/Button";
import axios from "axios";
import { useEffect, useState } from "react";
const columns = [
  { field: "id", headerName: "ID", width: 70 },
  { field: "startDate", headerName: "Start Time", width: 270 },
];
const addId = (array) => {
  array.map((item, i) => {
    item.id = i + 1;
  });
};

export default function History() {
  const [myrows, seMyRows] = useState([]);

  async function fetchDate() {
    await axios({
      method: "get",
      url: "http://localhost:10000" + "/getLives",
      headers: { "auth-token": localStorage.getItem("auth-token") },
    }).then((res) => {
      const result = addId(res.data.livesList);

      console.log(result);
      seMyRows(res.data.livesList);
    });
  }
  useEffect(() => {
    fetchDate();
  }, []);
  return (
    <Container>
      <br />
      <h1>My Live History</h1>
      <br />

      <div style={{ height: 530, width: "100%" }}>
        <DataGrid
          rows={myrows}
          columns={columns}
          pageSize={8}
          rowsPerPageOptions={[8]}
        />
      </div>
    </Container>
  );
}

// import axios from "axios";
// import React, { useEffect, useState } from "react";
// import { Container } from "react-bootstrap";
// import Table from "react-bootstrap/Table";

// export default function History() {
//   const [livesList, setLivesList] = useState([]);

//   async function fetchDate() {
//     await axios({
//       method: "get",
//       url: "http://localhost:10000" + "/getLives",
//       headers: { "auth-token": localStorage.getItem("auth-token") },
//     }).then((allLives) => {
//       setLivesList(allLives.data);
//     });
//   }
//   useEffect(() => {
//     fetchDate();
//   }, []);

//   return (
//     <div>
//       <br />
//       <h1>My Live History</h1>
//       <br />
//       <Table striped>
//         <tbody>
//           <tr>
//             <td>#</td>
//             <td>Start Time</td>
//           </tr>
//           {livesList.map((item, i) => {
//             <tr key={i}>
//               <td>{i}</td>
//               <td>{item.startDate}</td>
//             </tr>;
//           })}
//         </tbody>
//       </Table>
//     </div>
//   );
// }
