import React, { useEffect, useState } from 'react';
import { Link } from "react-router-dom"; // เพิ่มบรรทัดนี้

function AdminReport() {
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showDetailIdx, setShowDetailIdx] = useState(null);
  const [statusList, setStatusList] = useState({});

  useEffect(() => {
    fetch('http://localhost:5001/api/admin/reports')
      .then(res => res.json())
      .then(data => {
        setReports(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const MAX_LEN = 30;

  const handleStatus = (idx, status) => {
    setStatusList(prev => ({ ...prev, [idx]: status }));
  };

  return (
    <div style={{
      maxWidth: 800,
      margin: "40px auto",
      padding: 24,
      background: "#fff",
      borderRadius: 12,
      boxShadow: "0 2px 12px rgba(30,41,59,0.08)"
    }}>
      {/* Header ปุ่ม */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24 }}>
        <Link to="/home">
          <button
            style={{
              width: 140,
              background: "#64748b",
              color: "#fff",
              border: "none",
              borderRadius: 8,
              padding: "8px 0",
              fontWeight: 500,
              fontSize: "1rem",
              boxShadow: "0 2px 8px rgba(30,41,59,0.08)",
              transition: "background 0.2s, box-shadow 0.2s",
              cursor: "pointer"
            }}
            onMouseOver={e => e.currentTarget.style.background = "#475569"}
            onMouseOut={e => e.currentTarget.style.background = "#64748b"}
          >
            Home
          </button>
        </Link>
        <Link to="/stat-slip">
          <button
            style={{
              width: 140,
              background: "#2563eb",
              color: "#fff",
              border: "none",
              borderRadius: 8,
              padding: "8px 0",
              fontWeight: 500,
              fontSize: "1rem",
              boxShadow: "0 2px 8px rgba(30,41,59,0.08)",
              transition: "background 0.2s, box-shadow 0.2s",
              cursor: "pointer"
            }}
            onMouseOver={e => e.currentTarget.style.background = "#1d4ed8"}
            onMouseOut={e => e.currentTarget.style.background = "#2563eb"}
          >
            Stat-slip
          </button>
        </Link>
      </div>
      <h2 style={{ textAlign: "center", color: "#1a237e", marginBottom: 24 }}>
        รายการแจ้งปัญหาจากผู้ใช้
      </h2>
      {loading ? (
        <div style={{ textAlign: "center", color: "#888", padding: 24 }}>กำลังโหลด...</div>
      ) : reports.length === 0 ? (
        <div style={{ textAlign: "center", color: "#888", padding: 24 }}>ยังไม่มีรายงาน</div>
      ) : (
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "1rem" }}>
          <thead>
            <tr style={{ background: "#e3e8f0" }}>
              <th style={{ padding: "10px 6px", border: "1px solid #cbd5e1" }}>หมวดหมู่</th>
              <th style={{ padding: "10px 6px", border: "1px solid #cbd5e1" }}>รายละเอียด</th>
              <th style={{ padding: "10px 6px", border: "1px solid #cbd5e1" }}>เวลา</th>
              <th style={{ padding: "10px 6px", border: "1px solid #cbd5e1" }}>สถานะ</th>
            </tr>
          </thead>
          <tbody>
            {reports.map((r, idx) => {
              const isLong = r.detail.length > MAX_LEN;
              const status = statusList[idx];
              let rowBg = "#fff";
              if (status === "success") rowBg = "#d1fae5"; // เขียวอ่อน
              if (status === "problem") rowBg = "#fee2e2"; // แดงอ่อน
              return (
                <tr key={idx} style={{ background: rowBg, transition: "background 0.2s" }}>
                  <td style={{ padding: "8px 6px", border: "1px solid #e2e8f0" }}>{r.category}</td>
                  <td style={{
                    padding: "8px 6px",
                    border: "1px solid #e2e8f0",
                    maxWidth: 220,
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    position: "relative"
                  }}>
                    {isLong ? (
                      showDetailIdx === idx ? (
                        <span>
                          {r.detail}
                          <button
                            style={{
                              marginLeft: 8,
                              fontSize: "0.85em",
                              padding: "2px 8px",
                              borderRadius: 6,
                              border: "1px solid #cbd5e1",
                              background: "#f3f4f6",
                              cursor: "pointer"
                            }}
                            onClick={() => setShowDetailIdx(null)}
                          >
                            ซ่อน
                          </button>
                        </span>
                      ) : (
                        <span>
                          {r.detail.slice(0, MAX_LEN) + "..."}
                          <button
                            style={{
                              marginLeft: 8,
                              fontSize: "0.85em",
                              padding: "2px 8px",
                              borderRadius: 6,
                              border: "1px solid #cbd5e1",
                              background: "#f3f4f6",
                              cursor: "pointer"
                            }}
                            onClick={() => setShowDetailIdx(idx)}
                            title="ดูรายละเอียดทั้งหมด"
                          >
                            ดูเพิ่ม
                          </button>
                        </span>
                      )
                    ) : (
                      <span>{r.detail}</span>
                    )}
                  </td>
                  <td style={{ padding: "8px 6px", border: "1px solid #e2e8f0" }}>
                    {new Date(r.date).toLocaleString()}
                  </td>
                  <td style={{ padding: "8px 6px", border: "1px solid #e2e8f0", textAlign: "center" }}>
                    <button
                      style={{
                        background: status === "success" ? "#22c55e" : "#f3f4f6",
                        color: status === "success" ? "#fff" : "#22c55e",
                        border: "1px solid #22c55e",
                        borderRadius: 6,
                        padding: "2px 2px",
                        marginRight: 4,
                        cursor: status ? "not-allowed" : "pointer",
                        fontWeight: status === "success" ? "bold" : "normal",
                        opacity: status ? 0.7 : 1,
                        minWidth: 24
                      }}
                      onClick={() => !status && handleStatus(idx, "success")}
                      disabled={!!status}
                      title="เรียบร้อย"
                    >
                      <span role="img" aria-label="success">✔️</span>
                    </button>
                    <button
                      style={{
                        background: status === "problem" ? "#ef4444" : "#f3f4f6",
                        color: status === "problem" ? "#fff" : "#ef4444",
                        border: "1px solid #ef4444",
                        borderRadius: 6,
                        padding: "2px 6px", // ปรับให้แคบลง
                        cursor: status ? "not-allowed" : "pointer",
                        fontWeight: status === "problem" ? "bold" : "normal",
                        opacity: status ? 0.7 : 1,
                        minWidth: 28
                      }}
                      onClick={() => !status && handleStatus(idx, "problem")}
                      disabled={!!status}
                      title="มีปัญหา"
                    >
                      <span role="img" aria-label="problem">❌</span>
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default AdminReport;