<script setup lang="ts">
import { useTheme } from "vuetify";
import AuthProvider from "@/views/pages/authentication/AuthProvider.vue";
import { useRouter } from "vue-router";

import logo from "@images/logo.svg?raw";
import authV1MaskDark from "@images/pages/auth-v1-mask-dark.png";
import authV1MaskLight from "@images/pages/auth-v1-mask-light.png";
import authV1Tree2 from "@images/pages/auth-v1-tree-2.png";
import authV1Tree from "@images/pages/auth-v1-tree.png";

const form = ref({
    username: "",
    email: "",
    first_name: "",
    last_name: "",
    birth_date: "",
    password: "",
    password2: "",
    privacyPolicies: false,
});

const router = useRouter();

const register = async () => {
    if (form.value.password !== form.value.password2) {
        console.error("Passwords do not match");
        return;
    }
    try {
        const response = await fetch("http://localhost:8000/api/register/", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                username: form.value.username,
                email: form.value.email,
                first_name: form.value.first_name,
                last_name: form.value.last_name,
                birth_date: form.value.birth_date,
                password: form.value.password,
                password2: form.value.password2,
            }),
        });

        let data;
        const rawText = await response.text(); // lê o corpo uma única vez

        try {
            data = JSON.parse(rawText); // tenta converter em JSON
        } catch {
            data = rawText; // se não for JSON, mantém a string pura
        }

        if (response.ok) {
            console.log("Registration success:", data);
            router.push("/login");
        } else {
            console.error("Registration failed:", data);
        }
    } catch (error) {
        console.error("Error during registration:", error);
    }
};

const vuetifyTheme = useTheme();

const authThemeMask = computed(() => {
    return vuetifyTheme.global.name.value === "light"
        ? authV1MaskLight
        : authV1MaskDark;
});

const isPasswordVisible = ref(false);

definePageMeta({ layout: "blank" });
</script>

<template>
    <!-- eslint-disable vue/no-v-html -->

    <div class="auth-wrapper d-flex align-center justify-center pa-4">
        <VCard class="auth-card pa-4 pt-7" max-width="448">
            <VCardItem class="justify-center">
                <NuxtLink to="/" class="d-flex align-center gap-3">
                    <!-- eslint-disable vue/no-v-html -->
                    <div class="d-flex" v-html="logo" />
                    <h2 class="font-weight-medium text-2xl text-uppercase">
                        Materio
                    </h2>
                </NuxtLink>
            </VCardItem>

            <VCardText class="pt-2">
                <h4 class="text-h4 mb-1">Adventure starts here 🚀</h4>
                <p class="mb-0">Make your app management easy and fun!</p>
            </VCardText>

            <VCardText>
                <VForm @submit.prevent="register">
                    <VRow>
                        <!-- Username -->
                        <VCol cols="12">
                            <VTextField
                                :id="useId()"
                                v-model="form.username"
                                label="Username"
                                placeholder="Johndoe"
                            />
                        </VCol>
                        <!-- email -->
                        <VCol cols="12">
                            <VTextField
                                :id="useId()"
                                v-model="form.email"
                                label="Email"
                                placeholder="johndoe@email.com"
                                type="email"
                            />
                        </VCol>
                        <!-- First Name -->
                        <VCol cols="12">
                            <VTextField
                                :id="useId()"
                                v-model="form.first_name"
                                label="First Name"
                                placeholder="John"
                            />
                        </VCol>
                        <!-- Last Name -->
                        <VCol cols="12">
                            <VTextField
                                :id="useId()"
                                v-model="form.last_name"
                                label="Last Name"
                                placeholder="Doe"
                            />
                        </VCol>
                        <!-- Birth Date -->
                        <VCol cols="12">
                            <VTextField
                                :id="useId()"
                                v-model="form.birth_date"
                                label="Birth Date"
                                placeholder="YYYY-MM-DD"
                                type="date"
                            />
                        </VCol>

                        <!-- password -->
                        <VCol cols="12">
                            <VTextField
                                :id="useId()"
                                v-model="form.password"
                                label="Password"
                                placeholder="············"
                                :type="isPasswordVisible ? 'text' : 'password'"
                                autocomplete="password"
                                :append-inner-icon="
                                    isPasswordVisible
                                        ? 'ri-eye-off-line'
                                        : 'ri-eye-line'
                                "
                                @click:append-inner="
                                    isPasswordVisible = !isPasswordVisible
                                "
                            />
                        </VCol>
                        <!-- password confirmation -->
                        <VCol cols="12">
                            <VTextField
                                :id="useId()"
                                v-model="form.password2"
                                label="Confirm Password"
                                placeholder="············"
                                :type="isPasswordVisible ? 'text' : 'password'"
                                autocomplete="new-password"
                                :append-inner-icon="
                                    isPasswordVisible
                                        ? 'ri-eye-off-line'
                                        : 'ri-eye-line'
                                "
                                @click:append-inner="
                                    isPasswordVisible = !isPasswordVisible
                                "
                            />
                            <div class="d-flex align-center my-6">
                                <VCheckbox
                                    id="privacy-policy"
                                    v-model="form.privacyPolicies"
                                    inline
                                />
                                <VLabel for="privacy-policy" style="opacity: 1">
                                    <span class="me-1">I agree to</span>
                                    <a
                                        href="javascript:void(0)"
                                        class="text-primary"
                                        >privacy policy & terms</a
                                    >
                                </VLabel>
                            </div>

                            <VBtn block type="submit"> Sign up </VBtn>
                        </VCol>

                        <!-- login instead -->
                        <VCol cols="12" class="text-center text-base">
                            <span>Already have an account?</span>
                            <NuxtLink class="text-primary ms-2" to="login">
                                Sign in instead
                            </NuxtLink>
                        </VCol>

                        <VCol cols="12" class="d-flex align-center">
                            <VDivider />
                            <span class="mx-4">or</span>
                            <VDivider />
                        </VCol>

                        <!-- auth providers -->
                        <VCol cols="12" class="text-center">
                            <AuthProvider />
                        </VCol>
                    </VRow>
                </VForm>
            </VCardText>
        </VCard>

        <VImg
            class="auth-footer-start-tree d-none d-md-block"
            :src="authV1Tree"
            :width="250"
        />

        <VImg
            :src="authV1Tree2"
            class="auth-footer-end-tree d-none d-md-block"
            :width="350"
        />

        <!-- bg img -->
        <VImg class="auth-footer-mask d-none d-md-block" :src="authThemeMask" />
    </div>
</template>

<style lang="scss">
@use "@core/scss/template/pages/page-auth";
</style>
