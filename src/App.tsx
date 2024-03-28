import { useEffect, useState } from "react";
import {
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  doc,
} from "firebase/firestore";
import { db } from "./firebase";
import { MdDelete } from "react-icons/md";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Table from "react-bootstrap/Table";
import Spinner from "react-bootstrap/Spinner";
// import SignUp from "./components/SignUp"

const App = () => {
  const [title, setTitle] = useState("");
  const [year, setYear] = useState("");
  const [books, setBooks] = useState<any>([]);
  const [loading, setLoading] = useState(false);
  const [loading2, setLoading2] = useState(false);
  const [loading3, setLoading3] = useState(false);
  const handleSubmit = async (e: any) => {
    e.preventDefault();
    if (title) {
      setLoading(true);
      const ref = await addDoc(collection(db, "library"), {
        title,
        year,
      });
      setBooks([...books, { id: ref.id, title, year }]);
      setLoading(false);
      setTitle("");
      setYear("");
    }
  };

  const deleteItem = async (e: any) => {
    setLoading3(true);
    await deleteDoc(doc(db, "library", e));
    const yangi = books.filter((k: any) => k.id !== e);
    setBooks(yangi);
    setLoading3(false);
  };

  useEffect(() => {
    async function getData() {
      setLoading2(true);
      let booksArr: any = [];
      const snap = await getDocs(collection(db, "library"));
      snap.forEach((doc) => {
        booksArr.push({ id: doc.id, ...doc.data() });
      });
      setBooks(booksArr);
      setLoading2(false);
    }
    getData();
  }, []);
  return (
    <div className="main">
      <div className="im">
        <img className="img" src="./booklist-copy.jpg" alt="" />
      </div>
      {/* <SignUp/> */}
      <h2>Add book</h2>
      <form onSubmit={handleSubmit}>
        <Form.Label>Book title: </Form.Label>
        <Form.Control
          type="text"
          placeholder="Book title..."
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <Form.Label>Book year: </Form.Label>
        <Form.Control
          type="number"
          placeholder="Book year..."
          onChange={(e) => setYear(e.target.value)}
          value={year}
        />
        <div className="bt">
          <Button
            variant="primary"
            type="submit"
            disabled={loading}
            className="btn"
          >
            {loading ? "loading..." : "Add book"}
          </Button>
        </div>
      </form>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>Book title</th>
            <th>Book year</th>
            <th>Delete</th>
          </tr>
        </thead>
        {loading2 ? (
          <tr>
            <td colSpan={4} className="spin">
              <Spinner animation="border" role="status">
                <span className="visually-hidden">Loading...</span>
              </Spinner>
            </td>
          </tr>
        ) : (
          <tbody>
            {books.map((book: any, index: number) => (
              <tr key={book.id}>
                <td>{index + 1}</td>
                <td>{book.title}</td>
                <td>{book.year}</td>
                <td style={{ textAlign: "center" }}>
                  <Button
                    variant="danger"
                    className="btn2"
                    onClick={() => deleteItem(book.id)}
                    disabled={loading3}
                  >
                    <MdDelete />
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        )}
      </Table>
    </div>
  );
};

export default App;
