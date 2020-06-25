(namespace 'user)

(module read-msg-test G
  (defcap G () true)

  (defun rm ()
    (+ 1 2)
    (read-msg)
  )
)
; (create-table ledger)
; (coin.transfer-create "covid-admin" "gas-payer-test" (create-gas-payer-guard) 2.0)
