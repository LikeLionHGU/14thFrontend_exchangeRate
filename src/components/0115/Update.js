import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

function Update() {
  const [data, setData] = useState({
    name: "",
    author: "",
    price: "",
    id: "",
  });
  const navigate = useNavigate();

  const onClickBtn = () => {
    navigate(`/`);
  };

  const onChangeInput = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  };

function updateDataToJSONFile() {
 //코드 작성
}

  return (
    <div>
      <h1 className="modal-title fs-5" id="exampleModalLabel">
        UPDATE BOOK INFO
      </h1>

      <div className="input-group">
        ID: <input onChange={onChangeInput} type="text" placeholder="id" name="id" />
      </div>
      <div className="input-group">
        NAME: <input onChange={onChangeInput} type="text" placeholder="name" name="name" />
      </div>
      <div className="input-group">
        AUTHOR: <input onChange={onChangeInput} type="text" placeholder="author" name="author" />
      </div>
      <div className="input-group">
        PRICE: <input onChange={onChangeInput} type="number" placeholder="price" name="price" />
      </div>
      <button type="button" onClick={onClickBtn}>
        Close
      </button>
      <button type="button" class="btn btn-primary" onClick={updateDataToJSONFile}>
        Update
      </button>
    </div>
  );
}

export default Update;
