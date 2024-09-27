import PropTypes from "prop-types";
import { TextField, Box } from "@mui/material";

const PersonalInfoStep = ({ formData, setFormData, errors }) => {
  return (
    <Box
      sx={{ display: "flex", flexDirection: "column", gap: 2, marginTop: 6 }}
    >
      <TextField
        label="First Name"
        value={formData.firstName}
        onChange={(e) =>
          setFormData({ ...formData, firstName: e.target.value })
        }
        error={!!errors.firstName}
        helperText={errors.firstName}
        InputLabelProps={{
          sx: {
            color: "#6a1b9a",
            "&.Mui-focused": {
              color: "#6a1b9a",
            },
          },
        }}
        InputProps={{
          sx: {
            "&::placeholder": {
              color: "#6a1b9a",
            },
          },
        }}
      />
      <TextField
        label="Last Name"
        value={formData.lastName}
        onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
        error={!!errors.lastName}
        helperText={errors.lastName}
        InputLabelProps={{
          sx: {
            color: "#6a1b9a",
            "&.Mui-focused": {
              color: "#6a1b9a",
            },
          },
        }}
        InputProps={{
          sx: {
            "&::placeholder": {
              color: "#6a1b9a",
            },
          },
        }}
      />
      <TextField
        label="Email"
        value={formData.email}
        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
        error={!!errors.email}
        helperText={errors.email}
        InputLabelProps={{
          sx: {
            color: "#6a1b9a",
            "&.Mui-focused": {
              color: "#6a1b9a",
            },
          },
        }}
        InputProps={{
          sx: {
            "&::placeholder": {
              color: "#6a1b9a",
            },
          },
        }}
      />
    </Box>
  );
};

PersonalInfoStep.propTypes = {
  formData: PropTypes.shape({
    firstName: PropTypes.string.isRequired,
    lastName: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
  }).isRequired,
  setFormData: PropTypes.func.isRequired,
  errors: PropTypes.shape({
    firstName: PropTypes.string,
    lastName: PropTypes.string,
    email: PropTypes.string,
  }).isRequired,
};

export default PersonalInfoStep;
