export type FeatureFlags =
    | "DARK_MODE"
    | "COLOR_MODE_DETECTOR"
    | "NOTIFICATIONS";

export type FeatureFlagDataSet = Record<FeatureFlags, boolean>;
