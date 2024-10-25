import { useState } from "react";

import "./styles.css";

const selectOption = [
  { id: 1, service: "bad", value: 0 },
  { id: 2, service: "good", value: 10 },
  { id: 3, service: "awesome", value: 20 },
];

export default function App() {
  const [formData, setFormData] = useState({
    bill: 0,
    service: "bad",
    friendService: "bad",
  });

  const myServiceValue = selectOption.find(
    (service) => service.service === formData.service
  ).value;

  const myFriendsServiceValue = selectOption.find(
    (service) => service.service === formData.friendService
  ).value;

  const averageValue =
    (Number(myServiceValue) + Number(myFriendsServiceValue)) / 2;

  const percentAverageValue = Math.round((formData.bill * averageValue) / 100);

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onReset = () => {
    setFormData({
      bill: 0,
      service: "bad",
      friendService: "bad",
    });
  };

  return (
    <div className="App">
      <Bill data={formData} onClick={onChange} />
      <Service data={formData} onClick={onChange} />
      <FriendService data={formData} onClick={onChange} />
      <Output data={formData} percentAverageValue={percentAverageValue} />
      <ResetBtn onReset={onReset} />
    </div>
  );
}

const ResetBtn = ({ onReset }) => {
  return <button onClick={onReset}>Reset</button>;
};

const Output = ({ data, percentAverageValue }) => {
  return (
    <p>
      {`You pay $${Number(data.bill) + percentAverageValue} ($${data.bill} +
        $${percentAverageValue} tip)`}
    </p>
  );
};

const Bill = ({ data, onClick }) => {
  return (
    <>
      <p>How much was the bill?</p>
      <input name="bill" type="text" value={data.bill} onChange={onClick} />
    </>
  );
};

const Service = ({ data, onClick }) => {
  return (
    <>
      <p>How did you like the service?</p>
      <select onChange={onClick} name="service" value={data.service}>
        {selectOption.map((service) => (
          <option key={service.id} value={service.service}>
            {service.service}
          </option>
        ))}
      </select>
    </>
  );
};

const FriendService = ({ data, onClick }) => {
  return (
    <>
      <p>How did you friend like the service?</p>

      <select
        onChange={onClick}
        name="friendService"
        value={data.friendService}
      >
        {selectOption.map((service) => (
          <option key={service.id} value={service.service}>
            {service.service}
          </option>
        ))}
      </select>
    </>
  );
};
