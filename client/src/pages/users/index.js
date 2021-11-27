import { Grid } from '@mui/material'
import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import Editable from '../../components/table';
import { getUserList, addNewUser, updateUser, deleteUser } from '../../actions/userActions';

const Users = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getUserList());
    }, [])
    const users = useSelector(state => state.user.users);
    const options = {
        actionsColumnIndex: -1,
        tableLayout: 'auto',
    }

    const editable = {
        onRowAdd: newData =>
          new Promise((resolve, reject) => {
            setTimeout(() => {
              dispatch(addNewUser(newData));
              resolve();
            }, 1000)
          }),
        onRowUpdate: (newData, oldData) =>
          new Promise((resolve, reject) => {
            setTimeout(() => {
              dispatch(updateUser(oldData._id, newData));
              resolve();
            }, 1000)
          }),
        onRowDelete: oldData =>
          new Promise((resolve, reject) => {
            setTimeout(() => {
              dispatch(deleteUser(oldData));
              resolve()
            }, 1000)
          }),
    }
    const fields = [
        { title: "Name", field: 'name' },
        { title: 'Email', field: 'email' },
        { title: 'Status', field: 'status', lookup: {1: 'Inactive', 2: 'Active'}},
        { title: 'Role', field: 'role', lookup: {1: 'admin', 2:'sender', 3:'user'}  }
    ]

    return (
        <Grid>
            <Editable data={users} title="Users" columns={fields} editable={editable} options={options}></Editable>
        </Grid>
    )
}

export default Users
