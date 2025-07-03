import { forwardRef } from 'react'

const Input = forwardRef(({ 
  type = 'text',
  placeholder,
  value,
  onChange,
  className = '',
  error = false,
  disabled = false,
  ...props 
}, ref) => {
  const baseClasses = 'w-full px-3 py-2 border rounded-lg font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-1 disabled:opacity-50 disabled:cursor-not-allowed'
  
  const errorClasses = error 
    ? 'border-error focus:ring-error focus:border-error' 
    : 'border-gray-300 focus:ring-primary focus:border-primary'
  
  const classes = `${baseClasses} ${errorClasses} ${className}`
  
  return (
    <input
      ref={ref}
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      className={classes}
      disabled={disabled}
      {...props}
    />
  )
})

Input.displayName = 'Input'

export default Input