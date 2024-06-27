import bunyan from "bunyan";

// eslint-disable-next-line new-cap
export default new bunyan.createLogger({
  name: "admin-dashboard",
  serializers: bunyan.stdSerializers,
  streams: [
    {
      level: process.env.LOG_LEVEL || "info",
      stream: process.stdout,
    },
  ],
});
