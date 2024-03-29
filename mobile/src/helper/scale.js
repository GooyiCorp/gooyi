import { width, height } from '../constants/size.js'

// Iphone dom 11 pro max
const guidelineBaseWidth = 414;
const guidelineBaseHeight = 896;

const scale = size => width / guidelineBaseWidth * size;
const verticalScale = size => height / guidelineBaseHeight * size;
const moderateScale = (size, factor = 0.5) => size + ( scale(size) - size ) * factor;

export {scale, verticalScale, moderateScale};