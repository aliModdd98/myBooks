import PropTypes from "prop-types";
import { TextField, Box } from "@mui/material";

const CardInfoStep = ({ formData, setFormData, errors }) => {
  return (
    <Box
      sx={{ display: "flex", flexDirection: "column", gap: 2, marginTop: 6 }}
    >
      <TextField
        label="Full Name"
        value={formData.fullName}
        onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
        error={!!errors.fullName}
        helperText={errors.fullName}
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
        label="Library Card Number"
        value={formData.cardNumber}
        onChange={(e) =>
          setFormData({ ...formData, cardNumber: e.target.value })
        }
        error={!!errors.cardNumber}
        helperText={errors.cardNumber}
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

CardInfoStep.propTypes = {
  formData: PropTypes.shape({
    fullName: PropTypes.string.isRequired,
    cardNumber: PropTypes.string.isRequired,
  }).isRequired,
  setFormData: PropTypes.func.isRequired,
  errors: PropTypes.shape({
    fullName: PropTypes.string,
    cardNumber: PropTypes.string,
  }).isRequired,
};

export default CardInfoStep;
