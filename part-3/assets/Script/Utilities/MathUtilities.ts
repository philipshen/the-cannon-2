const { cos, sin, PI } = Math

export const clamp = (val, min, max) => val < min ? min : val > max ? max : val;
const rad = deg => deg * PI / 180;
export const cosd = deg => cos(rad(deg));
export const sind = deg => sin(rad(deg));