const FloralDecorations = () => {
  return (
    <>
      {/* Top left corner flower */}
      <div className="fixed top-0 left-0 pointer-events-none z-10 opacity-60">
        <svg width="120" height="120" viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
          <g transform="translate(-30, -30)">
            {/* Rose petals */}
            <ellipse cx="60" cy="40" rx="15" ry="25" fill="hsl(350, 70%, 75%)" transform="rotate(-20, 60, 60)" />
            <ellipse cx="80" cy="50" rx="15" ry="25" fill="hsl(345, 65%, 70%)" transform="rotate(30, 60, 60)" />
            <ellipse cx="70" cy="70" rx="15" ry="25" fill="hsl(350, 60%, 72%)" transform="rotate(80, 60, 60)" />
            <ellipse cx="45" cy="65" rx="15" ry="25" fill="hsl(355, 65%, 75%)" transform="rotate(130, 60, 60)" />
            <ellipse cx="40" cy="45" rx="15" ry="25" fill="hsl(348, 70%, 70%)" transform="rotate(180, 60, 60)" />
            <circle cx="60" cy="55" r="12" fill="hsl(45, 80%, 75%)" />
            {/* Leaves */}
            <ellipse cx="90" cy="85" rx="8" ry="18" fill="hsl(150, 50%, 45%)" transform="rotate(45, 90, 85)" />
            <ellipse cx="30" cy="80" rx="8" ry="18" fill="hsl(150, 45%, 50%)" transform="rotate(-30, 30, 80)" />
          </g>
        </svg>
      </div>

      {/* Top right corner flower */}
      <div className="fixed top-0 right-0 pointer-events-none z-10 opacity-60">
        <svg width="140" height="140" viewBox="0 0 140 140" fill="none" xmlns="http://www.w3.org/2000/svg">
          <g transform="translate(50, -20)">
            {/* Peony-style flower */}
            <ellipse cx="50" cy="35" rx="18" ry="28" fill="hsl(330, 60%, 80%)" transform="rotate(-15, 50, 60)" />
            <ellipse cx="75" cy="45" rx="18" ry="28" fill="hsl(325, 55%, 75%)" transform="rotate(25, 50, 60)" />
            <ellipse cx="65" cy="75" rx="18" ry="28" fill="hsl(335, 50%, 78%)" transform="rotate(75, 50, 60)" />
            <ellipse cx="35" cy="70" rx="18" ry="28" fill="hsl(328, 55%, 77%)" transform="rotate(125, 50, 60)" />
            <ellipse cx="30" cy="40" rx="18" ry="28" fill="hsl(332, 60%, 73%)" transform="rotate(175, 50, 60)" />
            <circle cx="50" cy="55" r="14" fill="hsl(50, 75%, 80%)" />
            {/* Leaves */}
            <ellipse cx="10" cy="90" rx="10" ry="22" fill="hsl(145, 45%, 42%)" transform="rotate(-45, 10, 90)" />
            <ellipse cx="85" cy="95" rx="10" ry="22" fill="hsl(148, 50%, 48%)" transform="rotate(35, 85, 95)" />
          </g>
        </svg>
      </div>

      {/* Bottom left corner flowers */}
      <div className="fixed bottom-0 left-0 pointer-events-none z-10 opacity-50">
        <svg width="180" height="180" viewBox="0 0 180 180" fill="none" xmlns="http://www.w3.org/2000/svg">
          <g transform="translate(-40, 60)">
            {/* Small flowers cluster */}
            <circle cx="50" cy="80" r="8" fill="hsl(340, 65%, 78%)" />
            <circle cx="42" cy="72" r="8" fill="hsl(345, 60%, 75%)" />
            <circle cx="58" cy="72" r="8" fill="hsl(338, 55%, 80%)" />
            <circle cx="45" cy="88" r="8" fill="hsl(342, 65%, 76%)" />
            <circle cx="55" cy="88" r="8" fill="hsl(350, 60%, 78%)" />
            <circle cx="50" cy="80" r="5" fill="hsl(48, 80%, 70%)" />
            
            {/* Second flower */}
            <circle cx="90" cy="100" r="10" fill="hsl(355, 55%, 82%)" />
            <circle cx="80" cy="90" r="10" fill="hsl(350, 60%, 78%)" />
            <circle cx="100" cy="90" r="10" fill="hsl(345, 55%, 80%)" />
            <circle cx="82" cy="110" r="10" fill="hsl(352, 60%, 76%)" />
            <circle cx="98" cy="110" r="10" fill="hsl(348, 55%, 82%)" />
            <circle cx="90" cy="100" r="6" fill="hsl(45, 75%, 72%)" />
            
            {/* Leaves */}
            <ellipse cx="120" cy="120" rx="12" ry="25" fill="hsl(150, 45%, 45%)" transform="rotate(20, 120, 120)" />
            <ellipse cx="30" cy="110" rx="10" ry="20" fill="hsl(148, 50%, 48%)" transform="rotate(-25, 30, 110)" />
            <ellipse cx="70" cy="130" rx="8" ry="18" fill="hsl(152, 45%, 42%)" transform="rotate(5, 70, 130)" />
          </g>
        </svg>
      </div>

      {/* Bottom right corner flowers */}
      <div className="fixed bottom-0 right-0 pointer-events-none z-10 opacity-50">
        <svg width="160" height="160" viewBox="0 0 160 160" fill="none" xmlns="http://www.w3.org/2000/svg">
          <g transform="translate(40, 50)">
            {/* Large rose */}
            <ellipse cx="60" cy="45" rx="16" ry="28" fill="hsl(348, 65%, 72%)" transform="rotate(-10, 60, 65)" />
            <ellipse cx="82" cy="55" rx="16" ry="28" fill="hsl(352, 60%, 75%)" transform="rotate(35, 60, 65)" />
            <ellipse cx="72" cy="80" rx="16" ry="28" fill="hsl(345, 55%, 78%)" transform="rotate(85, 60, 65)" />
            <ellipse cx="45" cy="78" rx="16" ry="28" fill="hsl(350, 60%, 74%)" transform="rotate(135, 60, 65)" />
            <ellipse cx="38" cy="52" rx="16" ry="28" fill="hsl(355, 65%, 70%)" transform="rotate(185, 60, 65)" />
            <circle cx="60" cy="62" r="13" fill="hsl(42, 80%, 75%)" />
            
            {/* Small accent flowers */}
            <circle cx="20" cy="90" r="6" fill="hsl(340, 55%, 82%)" />
            <circle cx="15" cy="84" r="6" fill="hsl(345, 60%, 78%)" />
            <circle cx="25" cy="84" r="6" fill="hsl(338, 55%, 80%)" />
            <circle cx="20" cy="90" r="4" fill="hsl(50, 75%, 75%)" />
            
            {/* Leaves */}
            <ellipse cx="95" cy="95" rx="10" ry="22" fill="hsl(150, 50%, 45%)" transform="rotate(30, 95, 95)" />
            <ellipse cx="5" cy="105" rx="8" ry="18" fill="hsl(148, 45%, 50%)" transform="rotate(-40, 5, 105)" />
          </g>
        </svg>
      </div>
    </>
  );
};

export default FloralDecorations;
