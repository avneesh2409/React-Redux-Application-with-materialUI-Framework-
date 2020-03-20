import React, { Fragment} from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { useSelector} from 'react-redux';
import { TablePagination, Button } from '@material-ui/core';


export default function User() {
 let data = []
  data = useSelector(state=> state.FetchUserReducer.data)
  const class1 = useSelector(state => state.userActionReducer)
  const x = useSelector(state => state.FetchCreationReducer)
  let role = {"1":"Admin"};
  if(!x.loading && x.data && x.data.status){
    for(let i = 0;i < x.data.result.length;i++)
    {
      role[`${x.data.result[i].date}`] = x.data.result[i].name
    }
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
              <TableCell><div>{`${role[row.createdby]}`}</div></TableCell>
              <TableCell><div>{row.address}</div></TableCell>
              <TableCell><div>{row.contact}</div></TableCell>
              <TableCell>
                <div>
                <Button variant="contained" color="primary">
                  Edit
              </Button>
              </div>
              </TableCell>
            </TableRow>
          ))
}
        </TableBody>
        </Fragment>
      </Table>
      :
      <h1>No data is present</h1>
      }
      <TablePagination count={10} rowsPerPage={8} onChangePage={(e,p)=>console.log(p)}/>
    </div>
  );
}

/*
const useToolbarStyles = makeStyles(theme => ({
  root: {
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(1),
  },
  highlight:
    theme.palette.type === 'light'
      ? {
          color: theme.palette.secondary.main,
          backgroundColor: lighten(theme.palette.secondary.light, 0.85),
        }
      : {
          color: theme.palette.text.primary,
          backgroundColor: theme.palette.secondary.dark,
        },
  title: {
    flex: '1 1 100%',
  },
}));
function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}
function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}


export default function User() {
 let data = []
  data = useSelector(state=> state.FetchUserReducer.data)
  const class1 = useSelector(state => state.userActionReducer)
  const x = useSelector(state => state.FetchCreationReducer)
  let role = {"1":"Admin"};
  if(!x.loading && x.data && x.data.status){
    for(let i = 0;i < x.data.result.length;i++)
    {
      role[`${x.data.result[i].date}`] = x.data.result[i].name
    }
  }



function createData(userid, image,email, name, gender, role_name,country,created_on,createdby,address,contact) {
  return { userid, image,email, name, gender, role_name,country,created_on,createdby,address,contact };
}



function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis.map(el => el[0]);
}

const headCells = [
  { id: 'userid', numeric: true, disablePadding: true, label: 'UserId' },
  { id: 'image', numeric: false, disablePadding: false, label: 'Image' },
  { id: 'email', numeric: false, disablePadding: false, label: 'EmailID' },
  { id: 'name', numeric: false, disablePadding: false, label: 'Name' },
  { id: 'gender', numeric: false, disablePadding: false, label: 'Gender' },
  { id: 'role_name', numeric: false, disablePadding: false, label: 'Role' },
  { id: 'country', numeric: false, disablePadding: false, label: 'Country' },
  { id: 'created_on', numeric: false, disablePadding: false, label: 'CreatedOn' },
  { id: 'createdby', numeric: false, disablePadding: false, label: 'CreatedBy' },
  { id: 'address', numeric: false, disablePadding: false, label: 'Address' },
  { id: 'contact', numeric: false, disablePadding: false, label: 'Contact' },
];

function EnhancedTableHead(props) {
  const { classes, onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort } = props;
  const createSortHandler = property => event => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        <TableCell padding="checkbox">
          <Checkbox
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAllClick}
            inputProps={{ 'aria-label': 'select all desserts' }}
          />
        </TableCell>
        {headCells.map(headCell => (
          <TableCell
            key={headCell.id}
            align={headCell.numeric ? 'right' : 'left'}
            padding={headCell.disablePadding ? 'none' : 'default'}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : 'asc'}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <span className={classes.visuallyHidden}>
                  {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                </span>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

EnhancedTableHead.propTypes = {
  classes: PropTypes.object.isRequired,
  numSelected: PropTypes.number.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
  order: PropTypes.oneOf(['asc', 'desc']).isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
};



const EnhancedTableToolbar = props => {
  const classes = useToolbarStyles();
  const { numSelected } = props;

  return (
    <Toolbar
      className={clsx(classes.root, {
        [classes.highlight]: numSelected > 0,
      })}
    >
      {numSelected > 0 ? (
        <Typography className={classes.title} color="inherit" variant="subtitle1">
          {numSelected} selected
        </Typography>
      ) : (
        <Typography className={classes.title} variant="h6" id="tableTitle">
          Nutrition
        </Typography>
      )}

      {numSelected > 0 ? (
        <Tooltip title="Delete">
          <IconButton aria-label="delete">
            <DeleteIcon />
          </IconButton>
        </Tooltip>
      ) : (
        <Tooltip title="Filter list">
          <IconButton aria-label="filter list">
            <FilterListIcon />
          </IconButton>
        </Tooltip>
      )}
    </Toolbar>
  )
}
}


EnhancedTableToolbar.propTypes = {
  numSelected: PropTypes.number.isRequired,
};

*/