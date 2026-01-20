import React, { useEffect } from "react";
import "./List.css";
import $ from "jquery";
import { useNavigate } from "react-router-dom";

function List() {
  const navigate = useNavigate();

  //get code
    function getDataFromJSONFile() {
    fetch("https://696202ead9d64c761906b8f3.mockapi.io/books")
      .then((response) => response.json())
      .then((book) => {
        console.log(book);
        $("#div_BookList").html("");
        book.forEach((item) => {
          const bookId = item.id || item.ID || "N/A";
          $("#div_BookList").append(`
                <div class="book-item">
                  <span class="book-id">${bookId}</span>
                  <span class="book-name">${item.name}</span>
                  <span class="book-author">${item.author}</span>
                  <span class="book-price">${item.price}</span>
                </div>
              `);
        });
      });
  }
  
 function deleteDataFromJSONFile() {
   
}


  
  useEffect(() => {
    getDataFromJSONFile();
  }, []);

  const onClickCreate = () => {
    navigate(`/create`);
  };

  const onClickUpdate = () => {
    navigate(`/update`);
  };

  return (
    <div>
      <h1>Book List</h1>
      <p>페이지를 새로고침 할 때마다 Book List 가 자동으로 불러와집니다.</p>
      <p>책을 추가, 수정, 삭제하고 싶으시면 오른쪽 버튼을 통해 페이지에 들어가 진행해주시면 됩니다.</p>
      <p>책의 id는 list의 가장 왼쪽에 있는 순서입니다.</p>
      <div class="main-container">
        <div id="div_BookList"></div>

        <div class="form-container">
          <button type="button" class="btn btn-primary" onClick={onClickCreate}>
            ADD BOOK
          </button>

          <button type="button" class="btn btn-primary" onClick={onClickUpdate}>
            UPDATE BOOK INFO
          </button>

          <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#deleteModal">
            DELETE BOOK
          </button>

          <div class="modal fade" id="deleteModal" tabindex="-1" aria-labelledby="deleteModalLabel" aria-hidden="true">
            <div class="modal-dialog">
              <div class="modal-content">
                <div class="modal-header">
                  <h1 class="modal-title fs-5" id="deleteModalLabel">
                    DELETE BOOK
                  </h1>
                  <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                  <div class="input-group">
                    ID : <input type="text" placeholder="id" id="book_id_delete" />
                  </div>
                </div>
                <div class="modal-footer">
                  <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">
                    Close
                  </button>
                  <button type="button" class="btn btn-primary" onClick={deleteDataFromJSONFile}>
                    Delete
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default List;