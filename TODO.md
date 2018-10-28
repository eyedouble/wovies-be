
# FEATURES & ENHANCEMENTS
## PI
- Unique slug endpoint. []
- Settings endpoint. [✓]
- Reboot system endpoint. [✓]
- Data dump endpoint. [✓]
- Data import endpoint. [✓]

## PII (Nice to have)
- Analytics data gen serv / save / realtime? []
- Files gzip export endpoint []
- Files gzip import endpoint []
- Tls []
  - Generate Priv key
  - Generate public key
  - Generate Csr
  - Use certificate & key
- Letsencrypt []


## Features (legacy)
- entries [✓]
- channels [✓]
- file manager [✓]
- menu [✓]
- sitemap [✓]
- routing [✓]
- static page memory [✓]
- weberver [✓]
- sass-compiler [✓]
- markdown [✓]
- image processing [2/3]
- modules [✓]
- site settings [ ]
- multi lingual [ ]


## Package / Dependency consideration list
- https://github.com/potatosalad/erlang-jose ( JWT / Encryption ) [FAILED] Not suitable depends on open ssl. Rather implement mbedtls (ARM) as a nif.
- https://github.com/ajg/synth (DTL template engine in C++)
- https://github.com/pantor/inja (DTL in C++, they say only header files include )

# BUGS

- On entry creation page processes are not rerendering. [✓]
- On channel creation page processes are not rerendering. [✓]
- On menu creation page processes are not rerendering. [✓]
- REPROCESSING IN GENERAL IS STILL BUGGY TEST!!! [✓]
- Entry component channel state persistent. If you are in entries and click on entries in the main menu angular believes no navigation occurs therefore the queryparam `channel=X` persists. [INCONVENIENT] []

FIXED? Probably
ranch_sup:start_link/0

1> ===> Failed to boot erlcms for reason {bad_return,
                                       {{erlcms_app,start,[normal,[]]},
                                        {'EXIT',
                                         {{badmatch,
                                           {error,
                                            {already_started,<0.539.0>}}},
                                          [{erlcms_app,start,2,
                                            [{file,
                                              "c:/DEV/ERL/erlcms/_build/default/lib/erlcms/src/erlcms_app.erl"},
                                             {line,37}]},
                                           {application_master,start_it_old,
                                            4,
                                            [{file,"application_master.erl"},
                                             {line,273}]}]}}}}



## NOTE EXTERNAL LINK MENU TYPE CRASHES ROUTER!!!! 