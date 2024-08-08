import React from "react";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { Chip, Box } from "@mui/material";
import { Dayjs } from "dayjs";

interface DateListProps {
  dateList: Dayjs[];
  pickDateList: (dates: Dayjs[]) => void;
}

const SimpleDatePicker: React.FC<DateListProps> = ({ dateList, pickDateList }) => {
  const handleDateChange = (date: Dayjs | null) => {
    if (date && !dateList.some((d) => d.isSame(date, "day"))) {
      pickDateList([...dateList, date]);
    }
  };

  const handleRemoveDate = (dateToRemove: Dayjs) => {
    pickDateList(dateList.filter((date) => !date.isSame(dateToRemove, "day")));
  };

  const disabledateList = (date: Dayjs) => {
    return dateList.some((d) => d.isSame(date, "day"));
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DatePicker
        label="Select dates"
        onChange={handleDateChange}
        shouldDisableDate={disabledateList}
      />
      <Box mt={2}>
        {dateList.map((date, i) => (
          <Chip
            key={i}
            label={date.format("YYYY-MM-DD")}
            onDelete={() => handleRemoveDate(date)}
            style={{ marginRight: "8px", marginBottom: "8px" }}
          />
        ))}
      </Box>
    </LocalizationProvider>
  );
};

export default SimpleDatePicker;
