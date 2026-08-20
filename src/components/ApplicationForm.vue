<template>
  <form class="application-form" :class="`application-form--${props.variant}`" novalidate @submit="onSubmit">
    <BaseInput name="firstName" label="Ім’я" autocomplete="given-name" :hide-label="variant === 'inline'" />
    <BaseInput name="lastName" label="Прізвище" autocomplete="family-name" :hide-label="variant === 'inline'" />
    <BaseInput name="email" label="Email" type="email" autocomplete="email" :hide-label="variant === 'inline'" />
    <BaseInput name="phone" label="Телефон" type="tel" autocomplete="tel" :hide-label="variant === 'inline'" />
    <BaseTextarea name="message" label="Повідомлення" :rows="variant === 'inline' ? 1 : 5" :hide-label="variant === 'inline'" />
    <BaseButton type="submit" :disabled="isSubmitting">{{ isSubmitting ? 'Надсилаємо…' : variant === 'inline' ? 'Залишити заявку →' : 'Надіслати повідомлення' }}</BaseButton>
    <p v-if="statusMessage" class="form-status" role="status">{{ statusMessage }}</p>
  </form>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { toTypedSchema } from '@vee-validate/zod'
import { useForm } from 'vee-validate'
import { z } from 'zod'
import BaseButton from './BaseButton.vue'
import BaseInput from './BaseInput.vue'
import BaseTextarea from './BaseTextarea.vue'
import { submitApplication } from '../services/application'

const props = withDefaults(defineProps<{ variant?: 'footer' | 'inline' | 'sheet' }>(), { variant: 'footer' })
const emit = defineEmits<{ submitted: [] }>()
const statusMessage = ref('')
const schema = toTypedSchema(z.object({
  firstName: z.string().min(2, 'Вкажіть ім’я'),
  lastName: z.string().min(2, 'Вкажіть прізвище'),
  email: z.string().email('Перевірте email'),
  phone: z.string().min(7, 'Перевірте телефон'),
  message: z.string().max(600, 'Не більше 600 символів').default(''),
}))
const { handleSubmit, isSubmitting } = useForm({ validationSchema: schema, initialValues: { firstName: '', lastName: '', email: '', phone: '', message: '' } })
const onSubmit = handleSubmit(async (values) => {
  statusMessage.value = ''
  try { await submitApplication(values); emit('submitted') }
  catch (error) { statusMessage.value = error instanceof Error ? error.message : 'Не вдалося надіслати форму.' }
})
</script>
