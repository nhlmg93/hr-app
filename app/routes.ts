import {
  type RouteConfig,
  index,
  prefix,
} from "@react-router/dev/routes";

export default [
  ...prefix("contacts", [
    index("routes/contacts/index.tsx"),
  ]),
] satisfies RouteConfig;
