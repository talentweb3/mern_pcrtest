import React, { useState, useContext } from 'react';
import { useDispatch } from 'react-redux';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import DatePickers from '../../components/datepicker';
import RadioButtonsGroup from '../../components/radiobox';
import { addUserInfo } from '../../actions/applyActions';
import { Button } from '@mui/material';
import DocumentType from '../../components/selectType';
import { TemplateContext } from '../../template/TemplateProvider';

export default function ({ setActiveStep }) {

  const [name, setName] = useState('');
  const [nameErr, setError] = useState(false);
  const [passErr, setPassErr] = useState(false);
  const [date, setDate] = useState('1990-01-01');
  const [type, setType] = useState(1)
  const [passport, setPassport] = useState('');
  const [value, setValue] = useState('male');
  const dispatch = useDispatch();
  const ctx = useContext(TemplateContext);
  // console.log("ctx.user:", ctx.user);
  const handleNext = () => {
    if (name === '') { 
      setError(true);
    } else if (passport === '') {
      setPassErr(true);
    } else {
      dispatch(addUserInfo(
        {
          userId: ctx.user.userData._id,
          name: name,
          birth: date,
          gender: value,
          passport: passport,
          docType: type,
        }
      ));
      setActiveStep(1);
    }

  }

  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Information
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <TextField 
            error={nameErr} 
            required 
            id="fullname" 
            label="Full Name" 
            fullWidth 
            autoComplete="cc-name" 
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <DatePickers date={date} setDate={setDate} />
        </Grid>
        <Grid item xs={12} md={6}>
          <RadioButtonsGroup value={value} setValue={setValue} />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            required
            error={passErr}
            id="passport"
            label="Passport"
            value={passport}
            onChange={(e) => setPassport(e.target.value)}
            fullWidth
            autoComplete="cc-csc"
          />
        </Grid>
        <Grid item xs={12} md={12}>
          <DocumentType type={type} setType={setType} />
        </Grid>
        <Grid container justifyContent="center" style={{ marginTop: 20 }}>
          <Button
            variant="contained"
            color="primary"
            onClick={handleNext}
          >
            Place order
          </Button>
        </Grid>
      </Grid>
    </React.Fragment>
  );
}