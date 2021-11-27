import React from 'react';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';

export default function DocumentType({ type, setType }) {

  return (
    <FormControl component="fieldset">
      <FormLabel component="legend">document type</FormLabel>
      <RadioGroup row aria-label="type" name="type" value={type} onChange={(e) => setType(e.target.value)}>
        <FormControlLabel value="1" control={<Radio />} label="Al Hekma" />
        <FormControlLabel value="2" control={<Radio />} label="Al Shames" />
        <FormControlLabel value="3" control={<Radio />} label="Mena" />
        <FormControlLabel value="4" control={<Radio />} label="Al Mokhtabar" />
      </RadioGroup>
    </FormControl>
  );
}