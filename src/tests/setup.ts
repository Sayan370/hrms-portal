import { server } from "@/mocks/api/server";
import matchers from "@testing-library/jest-dom/matchers";
import { cleanup } from "@testing-library/react";
import { afterEach, expect } from "vitest";

expect.extend(matchers);

beforeAll(() =>
    server.listen({
        onUnhandledRequest: "warn",
    })
);

afterEach(() => {
    cleanup();
    server.resetHandlers();
});

afterAll(() => server.close());
