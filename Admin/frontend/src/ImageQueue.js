import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./ImageQueue.css";

function ImageQueue() {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    fetchImages();
    // รีเฟรชทุก 5 วินาที
    const interval = setInterval(fetchImages, 5000);
    return () => clearInterval(interval);
  }, []);

  const fetchImages = async () => {
    try {
      const response = await fetch("http://localhost:5001/api/queue");
      if (response.ok) {
        const data = await response.json();
        setImages(data);
      }
    } catch (error) {
      console.error("Error fetching images:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleImageClick = (image) => {
    setSelectedImage(image);
    setShowModal(true);
  };

  const handleApprove = async (id) => {
    try {
      const response = await fetch(`http://localhost:5001/api/approve/${id}`, {
        method: "POST",
      });
      if (response.ok) {
        fetchImages();
        setShowModal(false);
      }
    } catch (error) {
      console.error("Error approving image:", error);
    }
  };

  const handleReject = async (id) => {
    try {
      const response = await fetch(`http://localhost:5001/api/reject/${id}`, {
        method: "POST",
      });
      if (response.ok) {
        fetchImages();
        setShowModal(false);
      }
    } catch (error) {
      console.error("Error rejecting image:", error);
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleString('th-TH', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (loading) {
    return (
      <div className="queue-container">
        <div className="loading-spinner">
          <div className="spinner"></div>
          <p>กำลังโหลด...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="queue-container">
      <header className="queue-header">
        <Link to="/" className="back-button">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M19 12H5M12 19l-7-7 7-7"/>
          </svg>
          กลับ
        </Link>
        <h1>คิวรูปภาพ</h1>
        <div className="queue-stats">
          <span className="queue-count">{images.length}</span>
          <button onClick={fetchImages} className="refresh-button">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M23 4v6h-6M1 20v-6h6M20.49 9A9 9 0 0 0 5.64 5.64L1 10m22 4l-4.64 4.36A9 9 0 0 1 3.51 15"/>
            </svg>
          </button>
        </div>
      </header>

      <main className="queue-content">
        {images.length === 0 ? (
          <div className="empty-state">
            <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
              <rect x="3" y="3" width="18" height="18" rx="2" ry="2"/>
              <circle cx="8.5" cy="8.5" r="1.5"/>
              <path d="M21 15l-5-5L5 21"/>
            </svg>
            <p>ไม่มีรูปภาพในคิว</p>
          </div>
        ) : (
          <div className="images-grid">
            {images.map((image, index) => (
              <div key={image.id} className="image-card" onClick={() => handleImageClick(image)}>
                <div className="card-header">
                  <span className="queue-number">#{index + 1}</span>
                  <span className="sender">{image.sender}</span>
                </div>
                
                <div className="image-preview">
                  <img 
                    src={`http://localhost:5001${image.filePath}`} 
                    alt="Preview"
                    onError={(e) => {
                      e.target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgZmlsbD0iI2Y5ZmFmYiIvPjx0ZXh0IHg9IjUwJSIgeT0iNTAlIiBmb250LXNpemU9IjE0cHgiIGZpbGw9IiM5Y2EzYWYiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGR5PSIuM2VtIj5No Image</text></svg>';
                    }}
                  />
                  {image.text && (
                    <div 
                      className="text-overlay"
                      style={{ 
                        color: image.textColor || 'white',
                        textShadow: image.textColor === 'white' ? '0 2px 4px rgba(0,0,0,0.8)' : '0 2px 4px rgba(255,255,255,0.8)'
                      }}
                    >
                      {image.text}
                    </div>
                  )}
                </div>
                
                <div className="card-footer">
                  <div className="time-price">
                    <span className="time">{image.time}นาที</span>
                    <span className="price">฿{image.price}</span>
                  </div>
                  <div className="date">{formatDate(image.receivedAt)}</div>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      {showModal && selectedImage && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>รายละเอียดรูปภาพ</h2>
              <button className="close-button" onClick={() => setShowModal(false)}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="18" y1="6" x2="6" y2="18"/>
                  <line x1="6" y1="6" x2="18" y2="18"/>
                </svg>
              </button>
            </div>
            
            <div className="modal-body">
              <div className="modal-image-container">
                <img 
                  src={`http://localhost:5001${selectedImage.filePath}`} 
                  alt="Full preview"
                  className="modal-image"
                />
                {selectedImage.text && (
                  <div 
                    className="modal-text-overlay"
                    style={{ 
                      color: selectedImage.textColor || 'white',
                      textShadow: selectedImage.textColor === 'white' ? '0 2px 8px rgba(0,0,0,0.8)' : '0 2px 8px rgba(255,255,255,0.8)'
                    }}
                  >
                    {selectedImage.text}
                  </div>
                )}
              </div>

              <div className="modal-details">
                <div className="detail-row">
                  <span className="label">ผู้ส่ง:</span>
                  <span className="value">{selectedImage.sender}</span>
                </div>
                <div className="detail-row">
                  <span className="label">เวลาที่เลือก:</span>
                  <span className="value">{selectedImage.time} นาที</span>
                </div>
                <div className="detail-row">
                  <span className="label">ราคา:</span>
                  <span className="value">฿{selectedImage.price}</span>
                </div>
                <div className="detail-row">
                  <span className="label">ส่งเมื่อ:</span>
                  <span className="value">{formatDate(selectedImage.createdAt)}</span>
                </div>
              </div>
            </div>

            <div className="modal-actions">
              <button 
                className="approve-button"
                onClick={() => handleApprove(selectedImage.id)}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M20 6L9 17l-5-5"/>
                </svg>
                อนุมัติ
              </button>
              <button 
                className="reject-button"
                onClick={() => handleReject(selectedImage.id)}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="18" y1="6" x2="6" y2="18"/>
                  <line x1="6" y1="6" x2="18" y2="18"/>
                </svg>
                ปฏิเสธ
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ImageQueue;