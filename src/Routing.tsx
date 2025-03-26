/*
 use wouter
 / => routes/RootRoute.tsx
 /:stage => routes/StageRoute.tsx
*/

import { Route, Switch } from "wouter";
import { RootRoute } from "./routes/RootRoute";
import { StageRoute } from "./routes/StageRoute";

export function Routing() {
  return (
    <Switch>
      <Route path="/" component={RootRoute} />
      <Route path="/stages/:id" component={StageRoute} />
    </Switch>
  );
}
