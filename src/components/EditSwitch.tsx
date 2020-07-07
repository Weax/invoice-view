import React from "react";
import { withStyles, Theme, createStyles } from "@material-ui/core/styles";
import Switch from "@material-ui/core/Switch";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";

const AntSwitch = withStyles((theme: Theme) =>
  createStyles({
    root: {
      width: 28,
      height: 16,
      padding: 0,
      display: "flex",
    },
    switchBase: {
      padding: 2,
      color: theme.palette.grey[500],
      "&$checked": {
        transform: "translateX(12px)",
        color: theme.palette.common.white,
        "& + $track": {
          opacity: 1,
          backgroundColor: theme.palette.primary.main,
          borderColor: theme.palette.primary.main,
        },
      },
    },
    thumb: {
      width: 12,
      height: 12,
      boxShadow: "none",
    },
    track: {
      border: `1px solid ${theme.palette.grey[500]}`,
      borderRadius: 16 / 2,
      opacity: 1,
      backgroundColor: theme.palette.common.white,
    },
    checked: {},
  })
)(Switch);

const EditSwitch: React.FC<{
  checked: boolean,
  onUpdate: (value: boolean) => void
}> = ({ checked, onUpdate }) => {

  const [checkedState, setCheckedState] = React.useState(checked);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCheckedState(event.target.checked);
    onUpdate(event.target.checked);
  };

  return (
    <Typography component="div">
      <Grid component="label" container alignItems="center" spacing={1}>
        <Grid item>
          <AntSwitch checked={checkedState} onChange={handleChange} />
        </Grid>
      </Grid>
    </Typography>
  );
};

export default EditSwitch;
