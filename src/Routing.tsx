/*
 use wouter
 / => routes/RootRoute.tsx
 /:stage => routes/StageRoute.tsx
*/

import { Route, Switch } from "wouter";
import { lazy, Suspense } from "react";

export function Routing() {
  return (
    <Suspense>
      <Switch>
        {/* <Route path="/" component={lazy(() => import("./routes/RootRoute"))} /> */}
        <Route path="/" component={lazy(() => import("./routes/RootRoute"))} />
        <Route
          path="/stages/:id"
          component={lazy(() => import("./routes/StageRoute"))}
        />
      </Switch>
    </Suspense>
  );
}
