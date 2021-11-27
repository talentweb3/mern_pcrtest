import { Grid } from '@mui/material'
import React, { useEffect, useContext} from 'react'
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import { useSelector, useDispatch } from 'react-redux';
import Editable from '../../components/table';
import { updateProposal, deleteProposal, getProposalList, viewRequest } from '../../actions/applyActions';
import { DELETE_USER } from '../../constants/userConstants';
import varialbe from '../../config';
import { TemplateContext } from '../../template/TemplateProvider';

const Proposal = () => {

    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getProposalList());
    }, [])
    
    const ctx = useContext(TemplateContext);
    const proposals = useSelector(state => state.proposal.proposals);
    
    const selfproposals = proposals.filter((proposal) => {
        return  proposal.userId === ctx.user?.userData._id;
    })
    const options = {
        actionsColumnIndex: -1,
        tableLayout: 'auto',
        rowStyle: rowData => ({
          backgroundColor: rowData.result == 1 ? '#e73636': rowData.result == 2 ? 'grey' : '',
          color: rowData.result == 2 || rowData.result == 1 ? 'white': '',
        })
      }
    
    const handleView = (id) => {
        dispatch(viewRequest({"_id": id}));
    }

    const editable = {
        onRowUpdate: (newData, oldData) =>
            new Promise((resolve, reject) => {
                setTimeout(() => {
                    dispatch(updateProposal(oldData._id, newData));
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
        { title: 'Positive/Negative', field: 'result', lookup: {1: 'positive', 2: 'negative'},editable: 'never'},
        { title: 'Applied date', field: 'createAt', editable: 'never' },
        { title: 'Control', field: 'control', render: rowData => {
              return( !(rowData.state==1)?(""):
                    <ButtonGroup variant="contained" aria-label="outlined primary button group">
                        <Button onClick={() => handleView(rowData._id)}>View and Download</Button>
                    </ButtonGroup>)
        }}
    ];

    return (
        <Grid>
            <Editable data={selfproposals} title="My request" columns={fields} editable={editable} options={options}></Editable>
        </Grid>
    )
}

export default Proposal
