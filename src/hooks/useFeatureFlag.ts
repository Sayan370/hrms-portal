import { FeatureFlags } from "@/models/feature-flags";
import { useFeatureFlagContext } from "@/contexts/FeatureFlagContext";

const useFeatureFlag = (key: FeatureFlags) => {
    const { featureFlagSet } = useFeatureFlagContext();

    return featureFlagSet[key];
};

export default useFeatureFlag;
