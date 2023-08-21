import Button from './Button'

const buttonExample = () => {
//버튼 예시 페이지입니다.
  return (
    <div>
      <div>
        <Button>default</Button>
        <Button color="primary">primary</Button>
        <Button color="secondary">secondary</Button>
      </div>
      <div>
      <Button variant="transparent">버튼</Button>
      <Button variant="disable">버튼</Button>
      <Button variant="outlined">버튼</Button>
      </div>
      <div>
        <Button size="small">small</Button>
        <Button size="medium">medium</Button>
        <Button size="large">large</Button>
      </div>
    </div>
  );
};

export default buttonExample;
