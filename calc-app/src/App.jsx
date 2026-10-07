import { useState } from 'react';
import './App.css';

// Component Display hiển thị kết quả
function Display({ value }) {
  return <div id="display">{value}</div>;
}

// Component Button nhận props nhãn, màu
function Button({ label, color, onClick, isZero, className }) {
  return (
    <button
      style={color ? { backgroundColor: color } : {}}
      className={`${isZero ? 'zero' : ''} ${className || ''}`}
      onClick={() => onClick(label)}
    >
      {label}
    </button>
  );
}

// Component chính
export default function App() {
  // State lưu biểu thức hiện tại
  const [expression, setExpression] = useState('0');

  const handleClick = (value) => {
    let currentExp = expression;
    
    if (value === 'C') {
      setExpression('0');
    } else if (value === '=') {
      try {
        const phanTuCuoi = currentExp.slice(-1);
        const cacDauPhepTinh = ['+', '-', '*', '/'];

        if (cacDauPhepTinh.includes(phanTuCuoi) || phanTuCuoi === '.') {
          currentExp = currentExp.slice(0, -1);
        }

        if (currentExp === '') {
           setExpression('0');
           return;
        }
        
        // Sử dụng eval để tính toán (Lưu ý: trong thực tế nên dùng thư viện hoặc hàm tự viết an toàn hơn)
        setExpression(eval(currentExp).toString());
      } catch (error) {
        setExpression('Lỗi');
      }
    } else {
       const cacDauPhepTinh = ['+', '-', '*', '/'];
       const phanTuCuoi = currentExp.slice(-1);

       if (currentExp === 'Lỗi') {
           setExpression((cacDauPhepTinh.includes(value) || value === '.') ? '0' + value : value);
           return;
       }

      if (cacDauPhepTinh.includes(value) && cacDauPhepTinh.includes(phanTuCuoi)) {
          setExpression(currentExp.slice(0, -1) + value);
          return;
      }

      if (value === '.') {
           const cacSo = currentExp.split(/[\+\-\*\/]/);
           const soCuoiCung = cacSo[cacSo.length - 1];
           
           if (soCuoiCung.includes('.')) {
               return; 
           }
      }

      if (currentExp === '0' && value !== '.' && !cacDauPhepTinh.includes(value)) {
          setExpression(value);
      } else {
          setExpression(currentExp + value);
      }
    }
  };

  return (
    <div className="calculator-container">
        <div className="calculator">
          <Display value={expression} />
          <div className="keypad">
            {/* Hàng 1 */}
            <Button label="C" className="clear" onClick={handleClick} />
            <Button label="/" className="operator" onClick={handleClick} />
            
            {/* Hàng 2 */}
            <Button label="7" onClick={handleClick} />
            <Button label="8" onClick={handleClick} />
            <Button label="9" onClick={handleClick} />
            <Button label="*" className="operator" onClick={handleClick} />
            
            {/* Hàng 3 */}
            <Button label="4" onClick={handleClick} />
            <Button label="5" onClick={handleClick} />
            <Button label="6" onClick={handleClick} />
            <Button label="-" className="operator" onClick={handleClick} />
            
            {/* Hàng 4 */}
            <Button label="1" onClick={handleClick} />
            <Button label="2" onClick={handleClick} />
            <Button label="3" onClick={handleClick} />
            <Button label="+" className="operator" onClick={handleClick} />
            
            {/* Hàng 5 */}
            <Button label="0" isZero={true} onClick={handleClick} />
            <Button label="." onClick={handleClick} />
            <Button label="=" className="equal" onClick={handleClick} />
          </div>
        </div>
    </div>
  );
}
