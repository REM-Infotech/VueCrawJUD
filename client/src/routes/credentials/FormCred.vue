<template>
  <div class="container px-4">
    <form
      class="card border-0 shadow rounded-3 my-5"
      action=""
      method="post"
      name="CadastroProcesso"
      enctype="multipart/form-data"
    >
      <!-- <h4 class="card-header p-4">{{ title }} - {{ func }}</h4>
      <div class="card-body bg-warning bg-opacity-75 p-4 p-sm-5">
        <div class="row g-3 rounded justify-content-center p-3">
          {{ form.hidden_tag() }}

          <div class="col-md-10 mb-3 border border-secondary p-2 border-2 rounded bg-white">
            {{ form.nome_cred.label(class="form-label") }}
            {{ form.nome_cred(class="form-control", placeholder=form.nome_cred.label.text) }}
          </div>
          <div class="col-md-10 mb-3 border border-secondary p-2 border-2 rounded bg-white">
            {{ form.system.label(class="form-label") }}
            {{ form.system(class="form-control", placeholder=form.system.label.text) }}
          </div>
          <div class="col-md-10 mb-3 border border-secondary p-2 border-2 rounded bg-white">
            {{ form.auth_method.label(class="form-label") }}
            {{ form.auth_method( class="form-control", placeholder=form.auth_method.label.text,
                    onchange="authMethodChange(this)") }}
          </div>
          <div id="pw" class="col-md-10" style="display: none">
            <div class="row">
              <div class="col-md-6 mb-3 border border-secondary p-2 border-2 rounded bg-white">
                {{ form.login.label(class="form-label") }}
                {{ form.login(class="form-control", placeholder=form.login.label.text) }}
              </div>
              <div class="col-md-6 mb-3 border border-secondary p-2 border-2 rounded bg-white">
                {{ form.password.label(class="form-label") }}
                {{ form.password(class="form-control", placeholder=form.password.label.text)}}
              </div>
            </div>
          </div>
          <div id="cert" class="col-md-10" style="display: none">
            <div class="row">
              <div class="col-md-12 mb-4 border border-secondary p-2 border-2 rounded bg-white">
                {{ form.doc_cert.label(class="form-label") }}
                {{ form.doc_cert(class="form-control", placeholder=form.doc_cert.label.text) }}
              </div>
              <div class="col-md-6 mb-3 border border-secondary p-2 border-2 rounded bg-white">
                {{ form.cert.label(class="form-label") }}
                {{ form.cert(class="form-control", placeholder=form.cert.label.text) }}
              </div>
              <div class="col-md-6 mb-3 border border-secondary p-2 border-2 rounded bg-white">
                {{ form.key.label(class="form-label") }}
                {{ form.key(class="form-control", placeholder=form.key.label.text) }}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="card-footer d-grid gap-2 p-3">
        {{ form.submit(class="btn btn-success btn-login fw-semibold", onclick="showLoad()") }}
      </div> -->
    </form>
  </div>
</template>
