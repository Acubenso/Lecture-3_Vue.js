const axios = require("axios");

export default {
  data() {
    return {
      zone: null,
    };
  },
  methods: {
    getTimeDetails() {
      return axios
        .get(`http://worldtimeapi.org/api/timezone/${this.zone}`)
        .then((res) => {
          const time = res.data.datetime.split("T")[1];
          const onlyTime = time.split(".")[0];
          const [hours, minutes, seconds] = onlyTime.split(":");

          return { hours, minutes, seconds, details: res.data };
        });
    },
  },
};
