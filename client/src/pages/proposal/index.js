import { Grid } from '@mui/material'
import React, { useEffect } from 'react'
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import { useSelector, useDispatch } from 'react-redux';
import Editable from '../../components/table';
import { updateProposal, deleteProposal, getProposalList, getApproved, getDeclined, viewRequest, sendMail } from '../../actions/applyActions';
import { DELETE_USER } from '../../constants/userConstants';
import varialbe from '../../config';
import { ALERT_ON } from '../../constants/alert';

const Proposal = () => {

    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getProposalList());
    }, [])
    const proposals = useSelector(state => state.proposal.proposals);
    const options = {
        actionsColumnIndex: -1,
        tableLayout: 'auto',
        rowStyle: rowData => ({
          backgroundColor: rowData.result == 1 ? '#e73636': rowData.result == 2 ? 'grey' : '',
          color: rowData.result == 2 || rowData.result == 1 ? 'white': '',
        })
      }
    // console.log("route:", varialbe.DB_ROUTE);
    
    const handleApproved = (id, result) => {
        if (result)
            dispatch(getApproved(id))
        else
           dispatch({type: ALERT_ON, payload: {
               severity: 'info',
               message: 'You have to select postive or negative.',
               open: true
           }})
    }

    const handleDecline = (id) => {
        dispatch(getDeclined(id))
    }

    const handleView = (id) => {
        dispatch(viewRequest({"_id": id}));
    }

    const handleEmail = (id) => {
        dispatch(sendMail({"_id": id}));
    }

    const editable = {
        onRowUpdate: (newData, oldData) =>
            new Promise((resolve, reject) => {
                setTimeout(() => {
                    if(newData.state === 1) {
                        dispatch({type: ALERT_ON, payload: {
                            severity: 'info',
                            message: 'The proposal is already approved.',
                            open: true
                        }})
                    } else {
                        dispatch(updateProposal(oldData._id, newData));
                    }
                    resolve();
                }, 1000)
            }),
        onRowDelete: oldData =>
            new Promise((resolve, reject) => {
                setTimeout(() => {
                    dispatch(deleteProposal(oldData._id));
                    resolve()
                }, 1000)
            }),
    }
    const fields = [
        { title: "Name", field: 'name', editable: 'never' },
        { title: 'Gender', field: 'gender', editable: 'never' },
        { title: 'Birthday', field: 'birth', editable: 'never' },
        { title: "Passport", field: 'passport', editable: 'never' },
        { title: 'State', field: 'state', lookup: { 0: 'pending', 1: 'approved', 2: 'decline' }, editable: 'never' },
        { title: 'Positive/Negative', field: 'result', lookup: {1: 'positive', 2: 'negative'}},
        { title: 'Applied date', field: 'createAt', editable: 'never' },
        { title: 'Control', field: 'control', render: rowData => {
            if (rowData.state == 0) 
                return (<ButtonGroup variant="contained" aria-label="outlined primary button group">
                            {/* {rowData.result==null?(""): */}
                            <Button color="success" onClick={() => (handleApproved(rowData._id, rowData.result))}>approved</Button>
                            {/*  } */}
                            <Button color="error" onClick={() => handleDecline(rowData._id)}>decline</Button>
                        </ButtonGroup>)
            else if(rowData.state == 1)
                return (<ButtonGroup variant="contained" aria-label="outlined primary button group">
                            <Button onClick={() => handleView(rowData._id)}>view</Button>
                            {/* <Button onClick={() => handleEmail(rowData._id)}>send email</Button> */}
                        </ButtonGroup>)
            }}
    ];

    return (
        <Grid>
            <Editable data={proposals} title="Proposals" columns={fields} editable={editable} options={options}></Editable>
        </Grid>
    )
}

export default Proposal
