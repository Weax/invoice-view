import React from "react";
import Input from '@material-ui/core/Input';

const EditText: React.FC<{
  text: string,
  onUpdate: (value: string) => void;
  [x:string]: any;
}> = ({
  text,
  onUpdate,
  ...props
}) => {

  const [value, setValue] = React.useState(text);

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
  };

  // We'll only update the external data when the input is blurred
  const onBlur = () => {
    onUpdate(value);
  };

  // If the value is changed external, sync it up with our state
  React.useEffect(() => {
    setValue(text);
  }, [text]);

  return <Input value={value} onChange={onChange} onBlur={onBlur} {...props}/>;
};

export default EditText;
