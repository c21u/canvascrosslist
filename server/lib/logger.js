import bunyan from "bunyan";

// eslint-disable-next-line new-cap
export default new bunyan.createLogger({
  name: "canvas-crosslist",
  serializers: bunyan.stdSerializers,
  streams: [
    {
      level: process.env.LOG_LEVEL || "info",
      stream: process.stdout,
    },
  ],
});
