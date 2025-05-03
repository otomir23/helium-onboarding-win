<script lang="ts">
    import { s } from "../lib/strings";
    import type { BrowserProfile } from "../lib/cr";
    import {
        selectedProfiles,
        previouslyImportedProfiles,
    } from "../lib/onboarding-flow";

    import CircleCheckbox from "./CircleCheckbox.svelte";

    type Props = {
        profile: BrowserProfile;
    };

    const { profile }: Props = $props();

    const selected = $derived($selectedProfiles.has(profile.index));
    const disabled = $derived($previouslyImportedProfiles.has(profile.index));

    const toggle = () => {
        if (!selected) {
            $selectedProfiles.add(profile.index);
        } else {
            $selectedProfiles.delete(profile.index);
        }
    };

    const dataList = () => {
        const options = [];

        if (profile.favorites) options.push(s.dataImport.bookmarks);
        if (profile.history) options.push(s.dataImport.history);
        if (profile.extensions) options.push(s.dataImport.extensions);

        return options.join(", ");
    };
</script>

<button
    class="big"
    onclick={toggle}
    class:selected
    aria-pressed={selected}
    {disabled}
>
    <CircleCheckbox checked={selected || disabled} />
    <div class="text">
        {#if profile.profileName}
            <h4>{profile.profileName}</h4>
        {/if}
        <p>{dataList()}</p>
    </div>
</button>

<style>
    button.big {
        gap: 16px;
        max-width: 600px;
        border-radius: 19px;
        padding: 12px 18px;

        &:first-child:not(:only-child) {
            border-bottom-left-radius: 10px;
            border-bottom-right-radius: 10px;
        }

        &:last-child:not(:only-child) {
            border-top-left-radius: 10px;
            border-top-right-radius: 10px;
        }

        &:not(:only-child):not(:last-child):not(:first-child) {
            border-radius: 10px;
        }
    }

    .text {
        display: flex;
        flex-direction: column;
        gap: 2px;
    }

    h4 {
        font-size: 17px;
    }
</style>
