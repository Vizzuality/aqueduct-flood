export const RETURN_PERIOD_OPTIONS = [
  { label: '2', value: '0002' },
  { label: '5', value: '0005' },
  { label: '10', value: '0010' },
  { label: '25', value: '0025' },
  { label: '50', value: '0050' },
  { label: '100', value: '0100' },
  { label: '250', value: '0250' },
  { label: '500', value: '0500' },
  { label: '1000', value: '1000' }
]

export const RETURN_PERIOD_MARKS = {};

RETURN_PERIOD_OPTIONS.forEach((opt) => {
  RETURN_PERIOD_MARKS[opt.label] = opt.value;
});


export default {
  RETURN_PERIOD_OPTIONS,
  RETURN_PERIOD_MARKS
};
