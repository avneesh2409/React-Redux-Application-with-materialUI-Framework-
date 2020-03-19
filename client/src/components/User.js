import React, { Fragment} from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { useSelector} from 'react-redux';


export default function User() {
 let data = []
  data = useSelector(state=> state.FetchUserReducer.data)
  const class1 = useSelector(state => state.userActionReducer)
let role = {
  '1':'SuperAdmin',
  '2':'VideoAdmin',
  '3':'Publisher',
  '4':'Advertiser'
}
  return (
    <div style={class1}>
      {(data.status) ?
      <Table>
      <Fragment>
        <TableHead>
          <TableRow>
            <TableCell>UserId</TableCell>
            <TableCell>UserImage</TableCell>
            <TableCell>Email</TableCell>
            <TableCell>Name</TableCell>
            <TableCell>Gender</TableCell>
            <TableCell>Role</TableCell>
            <TableCell>Country</TableCell>
            <TableCell>Creates On</TableCell>
            <TableCell>Created By</TableCell>
            <TableCell>Address</TableCell>
            <TableCell>Contact</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {
          data.result.map((row, i) => (
            <TableRow key={i}>
              <TableCell><div>{row.userid}</div></TableCell>
              <TableCell><img alt="not found" src={row.image} width='30px' style={{borderRadius:'50%'}} height='30px' /></TableCell>
              <TableCell><div>{row.email}</div></TableCell>
              <TableCell><div>{row.name}</div></TableCell>
              <TableCell><div>{row.gender}</div></TableCell>
              <TableCell><div>{row.role_name}</div></TableCell>
              <TableCell><div>{row.country}</div></TableCell>
              <TableCell><div>{row.created_on}</div></TableCell>
              <TableCell><div>{role[`${row.createdby}`]}</div></TableCell>
              <TableCell><div>{row.address}</div></TableCell>
              <TableCell><div>{row.contact}</div></TableCell>
            </TableRow>
          ))
}
        </TableBody>
        </Fragment>
      </Table>
      :
      <h1>No data is present</h1>
      }
    </div>
  );
}