import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Modal, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCoffee, faFilter } from '@fortawesome/free-solid-svg-icons';

import './App.css';

const App = () => {
  const [images, setImages] = useState([]);
  const [columnSize, setColumnSize] = useState(window.innerWidth <= 980 ? 12 : 9);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    fetch('https://picsum.photos/v2/list?page=1&limit=5') // Fetch 5 random images
      .then(response => response.json())
      .then(data => setImages(data))
      .catch(error => console.error('Error fetching images:', error));
  }, []);

  useEffect(() => {
    const handleResize = () => {
      console.log(window.innerWidth);
      // Check the window width and update the column size accordingly
      if (window.innerWidth <= 980) {
        setColumnSize(12); // Full width for extra small screens
      } else {
        setColumnSize(9); // One-third width for larger screens
      }
    };

    // Add event listener to handle window resize
    window.addEventListener('resize', handleResize);

    // Call handleResize once to set the initial column size
    handleResize();

    // Clean up the event listener when component unmounts
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // helps open modal
  const handleOpenModal = () => setShowModal(true);
  // helps close modal
  const handleCloseModal = () => setShowModal(false);


  return (
    <Container fluid className="main-parent">
      <Row>
        <Col
          xs={3}
          style={{ border: "1px solid red" }}
          className="sidenav-parent"
        >
          <h1>Some random things</h1>
        </Col>
        <Col
          xs={columnSize}
          style={{ border: "1px solid black" }}
          className="image-parent"
        >
          {images.map((image) => (
            <div key={image.id} style={{ marginBottom: "20px" }}>
              <img
                src={image.download_url}
                alt="Random"
                style={{
                  width: "100%",
                  height: "500px",
                  boxSizing: "border-box",
                }}
              />
              <h3>{image.author}</h3>
            </div>
          ))}
        </Col>
      </Row>

      {/* Floating bar for mobile screens */}
      <Row>
        <div className="floating-bar">
          <Col xs={4} className="bar-item" onClick={handleOpenModal}>
            Button 1 <FontAwesomeIcon className="icon" icon={faFilter} />
          </Col>
          <Col xs={4} className="bar-item">
            Button 2 <FontAwesomeIcon className="icon" icon={faCoffee} />
          </Col>
          <Col xs={4} className="bar-item">
            Button 3 <FontAwesomeIcon className="icon" icon={faCoffee} />
          </Col>
        </div>
      </Row>

      {/* Full-screen modal */}
      <Modal
        show={showModal}
        onHide={handleCloseModal}
        fullscreen
        dialogClassName="modal-fullscreen"
      >
        <Modal.Header closeButton>
          <Modal.Title>Full Screen Modal</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h1>Full Screen content</h1>
          <h1>Full Screen content</h1>
          <h1>Full Screen content</h1>
          <h1>Full Screen content</h1>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>

    </Container>
  );
};

export default App;
