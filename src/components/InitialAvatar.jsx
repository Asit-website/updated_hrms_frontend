import React from "react";
const InitialsAvatar = ({ name, size = 50, textColor = '#fff', customColors }) => {
  const defaultColors = [
    '#F44336',
    '#E91E63',
    '#9C27B0',
    '#673AB7',
    '#3F51B5',
    '#2196F3',
    '#03A9F4',
    '#00BCD4',
    '#009688',
    '#4CAF50',
    '#8BC34A',
    '#FFC107',
    '#FF9800',
    '#FF5722',
  ];

  const getInitials = (fullName) => {
    const words = fullName.trim().split(' ');
    const firstInitial = words[0]?.[0] || '';
    const lastInitial = words.length > 1 ? words[words.length - 1][0] : '';
    return (firstInitial + lastInitial).toUpperCase();
  };

  const stringToColorIndex = (str, colorArray) => {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      hash = str.charCodeAt(i) + ((hash << 5) - hash);
    }
    return Math.abs(hash) % colorArray.length;
  };

  const initials = getInitials(name);
  const colors = customColors || defaultColors;
  const bgColor = colors[stringToColorIndex(name, colors)];

  return (
    <div
      style={{
        width: size,
        height: size,
        borderRadius: '50%',
        backgroundColor: bgColor,
        color: textColor,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontWeight: 'bold',
        fontSize: size * 0.4,
        userSelect: 'none',
      }}
    >
      {initials}
    </div>
  );
};

export default InitialsAvatar;
