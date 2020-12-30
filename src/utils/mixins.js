import Vue from "vue";
import { mapMutations } from "vuex";
import { toLower } from "lodash-es";
import moment from "moment";
import { FORMAT_DATE_TIME, FORMAT_DATE } from '@/plugins/constants'


const checkValidPhone = (event) => {
  const specialKeyCodes = [8, 9, 13, 46, 37, 39]; // backspace, enter, tab, delete, arrow left. arrow right
  const ctrlCombines = [65, 67, 86, 88]; // ctrl A, ctrl C, ctrl V, ctrl X
  if (
    !event.shiftKey &&
    ((event.keyCode >= 48 && event.keyCode <= 57) ||
      (event.keyCode >= 96 && event.keyCode <= 105) ||
      (event.ctrlKey && ctrlCombines.includes(event.keyCode)) ||
      specialKeyCodes.includes(event.keyCode))
  ) {
    return true;
  }
  return event.preventDefault();
};

const convertToDateVietNam = (date) => {
  if (moment(date).isValid()) return moment(date).format("DD/MM/YYYY");
  return null;
};

const convertToISODate = (date) => {
  if (moment(date, "DD/MM/YYYY").isValid())
    return moment(date, "DD/MM/YYYY").format("YYYY-MM-DD");
  return null;
};

const formatTimeUTC = (date) => {
  return moment(date)
    .utc()
    .format(FORMAT_DATE_TIME);
};

const formatTimeLocal = (date) => {
  return moment
    .utc(date)
    .local()
    .format(FORMAT_DATE);
};

export function removeUnicodeCharacters(text) {
  text = toLower(text);
  text = text.replace(/á|à|ả|ạ|ã|ă|ắ|ằ|ẳ|ẵ|ặ|â|ấ|ầ|ẩ|ẫ|ậ/gi, "a");
  text = text.replace(/é|è|ẻ|ẽ|ẹ|ê|ế|ề|ể|ễ|ệ/gi, "e");
  text = text.replace(/i|í|ì|ỉ|ĩ|ị/gi, "i");
  text = text.replace(/ó|ò|ỏ|õ|ọ|ô|ố|ồ|ổ|ỗ|ộ|ơ|ớ|ờ|ở|ỡ|ợ/gi, "o");
  text = text.replace(/ú|ù|ủ|ũ|ụ|ư|ứ|ừ|ử|ữ|ự/gi, "u");
  text = text.replace(/ý|ỳ|ỷ|ỹ|ỵ/gi, "y");
  text = text.replace(/đ/gi, "d");

  // Remove special characters
  // eslint-disable-next-line
  // text = text.replace(/\`|\~|\!|\@|\#|\||\$|\%|\^|\&|\*|\(|\)|\+|\=|\,|\.|\/|\?|\>|\<|\'|\"|\:|\;|_/gi, "")

  return text;
}

const getTimeLocale = (time, format = "DD/MM/YYYY HH:mm:ss") => {
  if (!moment(time)._isValid) return null;
  return moment
    .utc(time)
    .local()
    .format(format);
};

const getTimeFromNow = (startTime, format = "DD/MM/YYYY HH:mm:ss") => {
  const fromTime = moment(getTimeLocale(startTime), format);

  // different year
  if (!moment().isSame(fromTime, "year")) {
    return moment(fromTime).format("DD/MM/YYYY HH:mm");
  }

  // date > 2 days ago
  if (moment().diff(fromTime, "days") > 2) {
    return moment(fromTime).format("DD/MM HH:mm");
  }

  return fromTime.from(moment().isBefore(fromTime) ? fromTime : moment());
};

const mixin = {
  data() {
    return {
      isMobile: window.innerWidth <= 625,
      isIPad: window.innerWidth <= 768,
      policyUrl: process.env.VUE_APP_POLICY_URL,
    };
  },

  methods: {
    ...mapMutations({
      setPopup: "setPopup",
    }),

    checkValidPhone,
    convertToISODate,
    convertToDateVietNam,
    removeUnicodeCharacters,
    formatTimeUTC,
    formatTimeLocal,
    getTimeFromNow,
  },
};

Vue.mixin(mixin);

export {
  checkValidPhone,
  convertToDateVietNam,
  convertToISODate,
  formatTimeUTC,
  formatTimeLocal,
};
