import Table from 'react-bootstrap/Table';
import React,{useState,useEffect, Fragment} from "react"
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import axios from 'axios';
import {ToastContainer,toast} from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
const CRUD =()=>{

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);


    const [name,setName] = useState("")
    const [age,setAge] = useState("")
    const [isActive,setActive] = useState(0)

    const [editId,setEditId] = useState("")
    const [edittName,setEditName] = useState("")
    const [editAge,setEditAge] = useState("")
    const [editIsActive,setEditActive] = useState(0)

    const empData = [
        {
            id:1,
            name:"faris",
            age:23,
            isActive:1
        },
        {
            id:2,
            name:"amal",
            age:32,
            isActive:0
        },
        {
            id:3,
            name:"sajjad",
            age:34,
            isActive:1
        },
    ]

    const [data,setdata] = useState([])

    useEffect(()=>{
        // setdata(empData)
        getData()
    },[])

    const getData =()=>{
      axios.get('http://localhost:5152/api/Employee')
      .then((result)=>{
        setdata(result.data)
      })
      .catch((error)=>{
        console.log(error);
      })
    }
    const handleEdit =(id)=>{
       handleShow();
       axios.get(`http://localhost:5152/api/Employee/${id}`)
       .then((result)=>{
        setEditName(result.data.name)
        setEditAge(result.data.age)
        setEditActive(result.data.isActive)
        setEditId(id)
       })
       .catch((error)=>{
        toast.error(error)
       })
    }
    const handleDelete =(id)=>
    {
      if(window.confirm("Are you sure to delete this employe") === true){
        axios.delete(`http://localhost:5152/api/Employee/${id}`)
        .then((result)=>{
          if(result.status === 200)
          {
            toast.success("Deleted succesfully")
            getData();
          }
          
        })
        .catch((error)=>{
          toast.error(error)
        })
      }
     
    }
    const handleUpdate = ()=>{
     const url =`http://localhost:5152/api/Employee/${editId}`
     const data = {
       "id":editId,
      "name": edittName,
      "age": editAge,
      "isActive": editIsActive
    }
    axios.put(url,data)
    .then((result)=>{
      handleClose()
      getData();
      clear();
      toast.success("Employe has been updated")
    })
    .catch((error)=>{
      toast.error(error)
    })
    }
    const handleActiveChange =(e)=>{
      if(e.target.checked){
        setActive(1)
      }
      else{
        setActive(0)
      }
    }
    const handleEditActiveChange =(e)=>{
      if(e.target.checked){
        setEditActive(1)
      }
      else{
        setEditActive(0)
      }
    }
    const handleSave =() =>{
      const url ='http://localhost:5152/api/Employee'
      const data = {
       
        "name": name,
        "age": age,
        "isActive": isActive
      }
      axios.post(url,data)
      .then((result)=>{
        getData();
        clear();
        toast.success("Employe has been added")
      })
      .catch((error)=>{
        toast.error(error)
      })
    }
    
    const clear = ()=>{
      setName('')
      setAge('')
      setActive(0)
      setEditName('')
      setEditAge('')
      setEditActive(0)
      setEditId('')
    }

    return(
        <Fragment>
          <ToastContainer/>
          <Container>
      <Row>
      <Col>
        <input type="text" className='form-control' placeholder='Enter Name'
        value={name} onChange={(e)=> setName(e.target.value)} />
        </Col>
        <Col>
        <input type="text" className='form-control' placeholder='Enter Age'
        value={age} onChange={(e)=> setAge(e.target.value)} />
        </Col>
        <Col>
        <input type="checkbox" checked={isActive === 1 ? true:false} 
        onChange={(e)=>handleActiveChange(e)} value={isActive} />
        <label>IsActive</label>
        </Col>
        <Col>
        <button className='btn btn-primary' onClick={()=>handleSave()}>Submit</button>
        </Col>
      </Row>
    </Container>
    <br></br>
      <Table striped bordered hover>
      <thead>
        <tr>
          <th>index</th>
          <th>Name</th>
          <th>age</th>
          <th>IsActive</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        {
          data && data.length > 0 ?
          data.map((item,index)=>{
            return (
              <tr key={index}>
              <td>{index+1}</td>
              <td>{item.name}</td>
              <td>{item.age}</td>
              <td>{item.isActive}</td>
              <td colSpan={2}>
                <button className='btn btn-primary' onClick={()=>handleEdit(item.id)}>Edit</button> &nbsp;
                <button className='btn btn-danger' onClick={()=> handleDelete(item.id)}>Delete</button>
              </td>
            </tr>
            )
          })
          :
          'Loading.......'
        }
       
      </tbody>
    </Table>
    <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Modify /Update employe</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <Row>
        <Col>
        <input type="text" className='form-control' placeholder='Enter Name'
        value={edittName} onChange={(e)=> setEditName(e.target.value)} />
        </Col>
        <Col>
        <input type="text" className='form-control' placeholder='Enter Age'
        value={editAge} onChange={(e)=> setEditAge(e.target.value)} />
        </Col>
        <Col>
        <input type="checkbox" checked={editIsActive === 1 ? true:false} 
        onChange={(e)=>handleEditActiveChange(e)} value={editIsActive} />
        <label>IsActive</label>
        </Col>
      </Row>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleUpdate}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
        </Fragment>
    )
}

export default CRUD;