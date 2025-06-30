export const showMessage = (text, error = false, color='#0D8ABC', duration = 1500, ) => {
    Toastify({
        text,
        duration,
        gravity: "bottom",       // ⬅️ From bottom
        position: "right",       // ⬅️ Right corner
        style: {
            background: error ? '#ff4d4f' : color,
            color: "#ffffff",
            fontSize: "15px",
            borderRadius: "6px",
            padding: "14px 24px",
            minWidth: "280px",
            maxWidth: "320px",
            textAlign: "center",
            fontFamily: "'Segoe UI', Roboto, sans-serif",
            fontWeight: "500",
            boxShadow: "0 4px 10px rgba(0,0,0,0.2)",
        }
    }).showToast();
};
