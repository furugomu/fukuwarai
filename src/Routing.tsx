/*
 use wouter
 / => routes/RootRoute.tsx
 /:stage => routes/StageRoute.tsx
*/

import { Redirect, Route, Switch } from "wouter";
import { lazy, Suspense } from "react";

export function Routing() {
  return (
    <Suspense
      fallback={
        <div className="flex items-center p-16">
          <span className="loading loading-bars loading-xl text-primary">
            Loading...
          </span>
        </div>
      }
    >
      <Switch>
        {/* <Route path="/" component={lazy(() => import("./routes/RootRoute"))} /> */}
        <Route path="/" component={lazy(() => import("./routes/RootRoute"))} />
        <Route
          path="/stages/:id"
          component={lazy(() => import("./routes/StageRoute"))}
        />
        <Route>
          <Redirect to="/" />
        </Route>
      </Switch>
    </Suspense>
  );
}
